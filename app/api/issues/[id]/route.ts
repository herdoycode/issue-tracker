import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
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
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: "Issue deleted." });
}
