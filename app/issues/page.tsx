import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "./_components/IssueStatusBadge";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <main>
      <div className="mb-3">
        <Button>
          <Link href="/issues/new">Add New Issue</Link>
        </Button>
      </div>
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
