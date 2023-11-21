import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssuesTable, { IssueQuery, columnNames } from "./IssuesTable";

interface Props {
  searchParams: IssueQuery;
}

const Issues = async ({ searchParams }: Props) => {
  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <main>
      <IssueActions />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        itemsCount={issuesCount}
        currentPage={page}
      />
    </main>
  );
};

export default Issues;
