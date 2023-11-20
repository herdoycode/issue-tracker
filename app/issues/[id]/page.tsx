import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const Issue = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return null;

  return (
    <div>
      <Flex width="100%" justify="between">
        <Box>
          <Heading as="h2">{issue.title}</Heading>
          <Flex gap="2" align="center" mt="3">
            <IssueStatusBadge status={issue.status} />
            <Text> {issue.createdAt.toDateString()} </Text>
          </Flex>
          <Card mt="5">
            <Text> {issue.description} </Text>
          </Card>
        </Box>
        <Box>
          <Button color="yellow">
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Issue;
