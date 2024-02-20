"use client";
import { Issue } from "@prisma/client";
import { Link, Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSortUp } from "react-icons/fa6";

interface Props {
  issues: Issue[];
}

const IssuesTable = ({ issues }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns: { label: string; className: string; value: keyof Issue }[] = [
    { label: "Title", className: "cursor-pointer", value: "title" },
    {
      label: "Status",
      className: "cursor-pointer hidden cursor-pointer md:table-cell",
      value: "status",
    },
    {
      label: "Created",
      className: "cursor-pointer hidden cursor-pointer md:table-cell",
      value: "createdAt",
    },
  ];

  const onSortIssue = (value: string) => {
    const params = new URLSearchParams(searchParams);
    searchParams.get("orderBy") === value
      ? params.delete("orderBy")
      : params.set("orderBy", value);
    router.push("?" + params.toString());
  };

  const renderSortIcon = (value: string) =>
    searchParams.get("orderBy") === value ? (
      <FaSortUp className="inline" />
    ) : null;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              onClick={() => onSortIssue(column.value)}
              className={column.className}
            >
              {column.label}
              {renderSortIcon(column.value)}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link className="text-blue-600" href={`/issues/${issue.id}`}>
                {issue.title}
              </Link>
              <div className="block md:hidden mt-1">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
