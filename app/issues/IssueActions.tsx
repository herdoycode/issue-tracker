import { Box, Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";
import Link from "next/link";

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
