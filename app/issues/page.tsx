import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
const Issues = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <main>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell> {issue.title} </Table.RowHeaderCell>
              <Table.Cell>
                {" "}
                <IssueStatusBadge status={issue.status} />{" "}
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
