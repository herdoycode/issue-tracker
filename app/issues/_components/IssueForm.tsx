"use client";
import { IssueInterface, issueSchema } from "@/app/api/issues/validate";
import { joiResolver } from "@hookform/resolvers/joi";
import { Issue } from "@prisma/client";
import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueInterface>({
    resolver: joiResolver(issueSchema),
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (issue) {
          axios
            .put(`/api/issues/${issue.id}`, data)
            .then(() => router.push("/issues"));
        } else {
          axios.post("/api/issues", data).then(() => router.push("/issues"));
        }
      })}
    >
      <div className="mb-3">
        <TextField.Root>
          <TextField.Input
            {...register("title")}
            defaultValue={issue?.title}
            type="text"
            placeholder="Title..."
          />
        </TextField.Root>
        {errors.title && <Text color="red"> {errors.title.message} </Text>}
      </div>
      <div className="mb-3">
        <TextArea
          {...register("description")}
          defaultValue={issue?.description}
          size="3"
          placeholder="Description..."
        />
        {errors.description && (
          <Text color="red"> {errors.description.message} </Text>
        )}
      </div>
      <Button type="submit"> Submit Issue </Button>
    </form>
  );
};

export default IssueForm;
