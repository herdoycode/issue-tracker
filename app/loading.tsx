import { Card, Flex, Heading, Skeleton, Table, Text } from "@radix-ui/themes";

const DashBoardLoading = async () => {
  return (
    <main className="px-2 md:px-0">
      <Flex gap="6" width="100%" direction={{ initial: "column", md: "row" }}>
        <div className="flex-1">
          <Flex align="center" gap="3" justify="between" mb="5">
            <Card>
              <Text>Open Issues</Text>
              <Skeleton className="w-7 h-7" />
            </Card>
            <Card>
              <Text>In-progress Issues</Text>
              <Skeleton className="w-7 h-7" />
            </Card>
            <Card>
              <Text>Closed Issues</Text>
              <Skeleton className="w-7 h-7" />
            </Card>
          </Flex>

          <Card>
            <Flex justify="between" px="8" py="4" align="end">
              <Skeleton className="w-1 h-[260px]" />
              <Skeleton className="w-[80px] h-[260px]" />
              <Skeleton className="w-[80px] h-[180px]" />
              <Skeleton className="w-[80px] h-[230px]" />
            </Flex>
          </Card>
        </div>
        <div className="flex-1">
          <Heading mb="4">Latest Issues</Heading>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {[1, 2, 3, 4].map((i) => (
                <Table.Row key={i}>
                  <Table.RowHeaderCell>
                    <Skeleton className="w-full h-5" />
                    <div className="mt-1">
                      <Skeleton className="w-[60px] h-5" />
                    </div>
                  </Table.RowHeaderCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </Flex>
    </main>
  );
};

export default DashBoardLoading;
