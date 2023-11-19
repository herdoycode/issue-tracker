import { NextRequest, NextResponse } from "next/server";
import { issueValidate } from "./validate";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { error } = issueValidate(body);
    if (error)
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    const { title, description } = body;
    const issue = await prisma.issue.create({
      data: { title, description },
    });
    return NextResponse.json(issue, { status: 201 });
  } catch (error) {}
}
