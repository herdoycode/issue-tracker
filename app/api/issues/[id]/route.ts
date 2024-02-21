import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";
import { Issue } from "@prisma/client";
import Joi from "joi";

interface Props {
  params: {
    id: string;
  };
}

const validate = (issue: Issue) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255),
    description: Joi.string().min(1),
  });
  return schema.validate(issue);
};

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthenticated request!" },
      { status: 401 }
    );
  const body = await request.json();
  const { error } = validate(body);
  if (error) return NextResponse.json(error.details[0].message);
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: {
      id: params.id,
    },
    data: {
      title: body.title,
      description: body.description,
      userId: body.userId,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthenticated request!" },
      { status: 401 }
    );
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: "Issue deleted." });
}
