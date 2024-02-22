import prisma from "@/prisma/client";
import { Heading, Link, Table } from "@radix-ui/themes";
import IssueStatusBadge from "./components/IssueStatusBadge";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return (
    <>
      <Heading mb="4">Latest Issues</Heading>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link className="text-blue-600" href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="mt-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";
export default LatestIssues;
