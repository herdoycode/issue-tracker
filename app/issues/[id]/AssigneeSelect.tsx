"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/api/users").then(({ data }) => setUsers(data));
  }, []);

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || "null"}
        onValueChange={(value) => {
          axios.put(`/api/issues/${issue.id}`, {
            title: issue.title,
            description: issue.description,
            userId: value === "null" ? null : value,
          });
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
