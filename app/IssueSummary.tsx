import { Card, Flex, Text, Heading } from "@radix-ui/themes";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  return (
    <Flex align="center" gap="3" justify="between" mb="5">
      <Card>
        <Text>Open Issues</Text>
        <Heading>{open}</Heading>
      </Card>
      <Card>
        <Text>In-progress Issues</Text>
        <Heading>{inProgress}</Heading>
      </Card>
      <Card>
        <Text>Closed Issues</Text>
        <Heading>{closed}</Heading>
      </Card>
    </Flex>
  );
};

export default IssueSummary;
