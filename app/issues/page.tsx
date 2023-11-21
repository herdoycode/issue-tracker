import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueStatusBadge from "./_components/IssueStatusBadge";

interface Props {
  searchParams: { status: Status; page: string; orderBy: keyof Issue };
}

const Issues = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    { label: "Date", value: "createdAt" },
  ];

  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;

  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where: {
      status,
    },
  });

  return (
    <main>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell>
                <Link
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
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
