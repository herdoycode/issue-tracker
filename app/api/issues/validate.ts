import Joi from "joi";

export interface IssueInterface {
  title: string;
  description: string;
}

export const issueSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().label("Title"),
  description: Joi.string().min(1).max(10000).required().label("Description"),
  userId: Joi.any(),
});

export const issueValidate = (issue: IssueInterface) => {
  return issueSchema.validate(issue);
};
