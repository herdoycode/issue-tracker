import { Box, Heading } from "@radix-ui/themes";
import IssueForm from "../_components/IssueForm";

const NewIssuePage = () => {
  return (
    <main className="flex items-center justify-center px-2 md:px-0">
      <Box className="w-full md:w-[600px]">
        <Heading align="center" mb="4" size={{ initial: "7", sm: "8" }}>
          Create New Issue
        </Heading>
        <IssueForm />
      </Box>
    </main>
  );
};

export default NewIssuePage;
