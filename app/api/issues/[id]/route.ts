import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueValidate } from "../validate";

interface Props {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!issue)
      return NextResponse.json({ error: "Issue Not Found!" }, { status: 404 });
    const body = await request.json();
    const { error } = issueValidate(body);
    if (error)
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: { title: body.title, description: body.description },
    });
    return NextResponse.json(updatedIssue);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!issue)
      return NextResponse.json({ error: "Issue Not Found!" }, { status: 404 });
    const deletedIssue = await prisma.issue.delete({
      where: { id: issue.id },
    });
    return NextResponse.json(deletedIssue);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
