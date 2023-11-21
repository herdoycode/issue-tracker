import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between" mb="3">
      <Box>
        <IssueStatusFilter />
      </Box>
      <Box>
        <Button>
          <Link href="/issues/new">Add New Issue</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default IssueActions;
