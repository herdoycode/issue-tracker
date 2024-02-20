"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Text, TextField } from "@radix-ui/themes";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import { Issue } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props {
  issue?: Issue;
}

type Inputs = {
  title: string;
  description: string;
};

const schema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).required(),
});

const IssueForm = ({ issue }: Props) => {
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: joiResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (issue) {
          setSubmiting(true);
          axios
            .patch(`/api/issues/${issue.id}`, {
              title: data.title,
              description: data.description,
            })
            .then(() => {
              reset();
              setSubmiting(false);
              router.push("/issues");
              router.refresh();
              toast.warning("Successfully Updated Issue.");
            })
            .catch(() => {
              setSubmiting(false);
              toast.error("something went wrong!");
            });
        } else {
          setSubmiting(true);
          axios
            .post("/api/issues", data)
            .then(() => {
              reset();
              setSubmiting(false);
              router.push("/issues");
              router.refresh();
              toast.success("Successfully Create Issue.");
            })
            .catch(() => {
              setSubmiting(false);
              toast.error("something went wrong!");
            });
        }
      })}
      className="space-y-4"
    >
      <div>
        <TextField.Input
          defaultValue={issue?.title}
          {...register("title")}
          placeholder="Title"
        />
        {errors.title && <Text color="red"> {errors.title.message} </Text>}
      </div>
      <div>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <MDEditor {...field} />}
        />
        {errors.description && (
          <Text color="red"> {errors.description.message} </Text>
        )}
      </div>
      <Button disabled={submiting}>
        {submiting ? "Loading..." : "Submit Issue"}
      </Button>
    </form>
  );
};

export default IssueForm;
