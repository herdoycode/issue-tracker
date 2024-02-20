import Joi from "joi";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Issue {
  title: string;
  description: string;
}

const validate = (issue: Issue) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required(),
  });
  return schema.validate(issue);
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { error } = validate(body);
  if (error)
    return NextResponse.json(error.details[0].message, { status: 400 });
  const { title, description } = body;
  const issue = await prisma.issue.create({
    data: { title, description },
  });
  return NextResponse.json(issue, { status: 201 });
}
