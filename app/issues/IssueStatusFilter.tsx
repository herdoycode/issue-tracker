"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    value === "all" ? params.delete("status") : params.set("status", value);
    router.push("?" + params.toString());
  };

  return (
    <Select.Root
      defaultValue="all"
      onValueChange={(value) => onValueChange(value)}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="all">All</Select.Item>
          {statuses.map((status) => (
            <Select.Item value={status.value}> {status.label} </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
