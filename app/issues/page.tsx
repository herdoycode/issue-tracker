import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Box, Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Pagination from "../components/Pagination";
import IssueStatusFilter from "./IssueStatusFilter";

interface Props {
  searchParams: {
    page: string;
    status: Status;
  };
}

const Issues = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;

  const pageSize = 6;
  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: {
      status: searchParams.status,
    },
  });

  return (
    <main className="px-2 md:px-0">
      <Box py="3">
        <IssueStatusFilter />
      </Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                {issue.title}
                <div className="block md:hidden mt-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {" "}
                {issue.createdAt.toDateString()}{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </main>
  );
};

export default Issues;
