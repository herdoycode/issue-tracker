import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import Pagination from "../components/Pagination";
import IssueStatusFilter from "./IssueStatusFilter";
import IssuesTable from "./IssuesTable";

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
    orderBy: {
      createdAt: "desc",
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
      <Flex align="center" justify="between" py="3">
        <IssueStatusFilter />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
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
