import prisma from "@/prisma/client";
import {
  AlertDialog,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

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
        <Flex direction="column" gap="2">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Issue;
