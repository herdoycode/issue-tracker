import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button color="yellow">
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
