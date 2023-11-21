import { Issue, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./_components/IssueStatusBadge";
import { FaSortUp } from "react-icons/fa6";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell>
              <Flex align="center" gap="1">
                <Link
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && <FaSortUp />}
              </Flex>
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
  );
};

export default IssuesTable;

export const columns: { label: string; value: keyof Issue }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Date", value: "createdAt" },
];

export const columnNames = columns.map((column) => column.value);
