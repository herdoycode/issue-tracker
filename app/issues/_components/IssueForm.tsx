"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Text, TextField } from "@radix-ui/themes";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";

type Inputs = {
  title: string;
  description: string;
};

const schema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).required(),
});

const IssueForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: joiResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="space-y-4"
    >
      <div>
        <TextField.Input {...register("title")} placeholder="Title" />
        {errors.title && <Text color="red"> {errors.title.message} </Text>}
      </div>
      <div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <MDEditor {...field} />}
        />
        {errors.description && (
          <Text color="red"> {errors.description.message} </Text>
        )}
      </div>
      <Button>Submit Issue</Button>
    </form>
  );
};

export default IssueForm;
