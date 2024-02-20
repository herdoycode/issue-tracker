import prisma from "@/prisma/client";
import { Box, Heading } from "@radix-ui/themes";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <main className="flex items-center justify-center px-2 md:px-0">
      <Box className="w-full md:w-[600px]">
        <Heading align="center" mb="4" size={{ initial: "7", sm: "8" }}>
          Create New Issue
        </Heading>
        <IssueForm issue={issue!} />
      </Box>
    </main>
  );
};

export default EditIssuePage;
