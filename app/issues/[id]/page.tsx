import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <main className="px-2 md:px-0">
      <Flex gap="6" direction={{ initial: "column", sm: "row" }}>
        <Box className="flex-1">
          <Heading as="h1" size="7">
            {issue?.title}
          </Heading>
          <Text size="1" mr="2">
            {issue?.createdAt.toDateString()}
          </Text>
          <IssueStatusBadge status={issue?.status!} />
          <Card className="mt-5 prose">{issue?.description}</Card>
        </Box>
        <Flex align="center" gap="4" px={{ initial: "0", sm: "4" }}>
          <Button size="1" color="yellow">
            Edit Issue
          </Button>
          <Button size="1" color="red">
            Delete Issue
          </Button>
        </Flex>
      </Flex>
    </main>
  );
};

export default IssueDetailsPage;
