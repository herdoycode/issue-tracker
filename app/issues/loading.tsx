import { Issue } from "@prisma/client";
import { Skeleton, Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";

const IssuesPageLoading = () => {
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

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {[1, 2, 3, 4, 5, 6].map((issue) => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton className="w-[120px] h-6" />
                <div className="block md:hidden mt-1">
                  <Skeleton className="w-[60px] h-6" />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="w-[120px] h-6" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="w-[120px] h-6" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPageLoading;
