import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssuesTable from "./IssuesTable";

interface Props {
  searchParams: {
    page: string;
    status: Status;
    orderBy: "title" | "description" | "createdAt";
  };
}

const Issues = async ({ searchParams }: Props) => {
  // SetPage for paginate
  const page = parseInt(searchParams.page) || 1;

  const pageSize = 6;

  // SetOrderBy for sorting issues
  const orderBy = searchParams.orderBy
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    orderBy,
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
      <IssueActions />
      <IssuesTable issues={issues} />
      <Pagination
        itemCount={issueCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </main>
  );
};

export default Issues;
