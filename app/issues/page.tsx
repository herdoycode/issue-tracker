import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueStatusBadge from "./_components/IssueStatusBadge";

interface Props {
  searchParams: { status: Status; page: string };
}

const Issues = async ({ searchParams }: Props) => {
  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
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
      <Pagination
        pageSize={pageSize}
        itemsCount={issuesCount}
        currentPage={page}
      />
    </main>
  );
};

export default Issues;
