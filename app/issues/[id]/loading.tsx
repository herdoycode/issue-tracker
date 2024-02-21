import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";

const IssueDetailsLoading = () => {
  return (
    <main className="px-2 md:px-0">
      <Flex gap="6" direction={{ initial: "column", sm: "row" }}>
        <Box className="flex-1">
          <Skeleton className="w-full h-7 mb-3" />
          <div className="flex gap-3">
            <Skeleton className="w-[80px] h-5" />
            <Skeleton className="w-[80px] h-5" />
          </div>

          <Card className="mt-5">
            <div className="space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </Card>
        </Box>
        <Flex
          direction="column"
          align="center"
          gap="4"
          px={{ initial: "0", sm: "4" }}
          className="w-[200px]"
        >
          <Skeleton className="w-full h-7" />
          <Skeleton className="w-full h-7" />
          <Skeleton className="w-full h-7" />
        </Flex>
      </Flex>
    </main>
  );
};

export default IssueDetailsLoading;
