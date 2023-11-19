import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issues = () => {
  return (
    <main>
      <Button>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </main>
  );
};

export default Issues;
