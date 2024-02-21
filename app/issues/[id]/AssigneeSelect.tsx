"use client";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  issueId: string;
  userId: string;
}

const AssigneeSelect = ({ issueId, userId }: Props) => {
  const router = useRouter();
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(({ data }) => data),
    staleTime: 60 * 1000,
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" className="w-full">
          Assign to user
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {users?.map((user) => (
          <DropdownMenu.Item
            onClick={() =>
              axios
                .patch(`/api/issues/${issueId}`, { userId: user.id })
                .then(() => {
                  toast.success("Successfully Assigned."), router.refresh();
                })
                .catch(() => toast.error("Something went wrong!"))
            }
            key={user.id}
          >
            {user.name}
            {user.id === userId ? (
              <FaCheck className="text-green-600 ms-1" />
            ) : (
              ""
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AssigneeSelect;
