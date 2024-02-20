"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  issueId: string;
}

const DeleteDialog = ({ issueId }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="w-full" color="red" size="2">
          Delete Issue
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Confirm Deletion</Dialog.Title>
        <Dialog.Description size="3" mb="4">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={() => {
                setLoading(true);
                axios
                  .delete(`/api/issues/${issueId}`)
                  .then(() => {
                    setLoading(false);
                    toast.success("Successfully Deleted.");
                    router.push("/issues");
                    router.refresh();
                  })
                  .catch(() => {
                    setLoading(false);
                    toast.error("Something went wrong!");
                  });
              }}
              color="red"
              disabled={loading}
            >
              Delte Issue
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDialog;
