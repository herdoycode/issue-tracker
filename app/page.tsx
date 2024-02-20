import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

const Home = async () => {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <main className="px-2 md:px-0">
      <Flex gap="6" width="100%" direction={{ initial: "column", md: "row" }}>
        <div className="flex-1">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </div>
        <div className="flex-1">
          <LatestIssues />
        </div>
      </Flex>
    </main>
  );
};

export default Home;
