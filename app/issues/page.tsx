import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "./_components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const Issues = async ({ searchParams }: Props) => {
  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
  });
  return (
    <main>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}> {issue.title} </Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell> {issue.createdAt.toDateString()} </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </main>
  );
};

export default Issues;
