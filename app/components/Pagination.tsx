"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const pageCount = Math.ceil(itemsCount / pageSize);

  const onPageChange = (page: number) => {
    router.push(`/issues?page=${page}`);
  };

  return (
    <Flex align="center" gap="3" my="4">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(1)}
        color="gray"
        variant="soft"
      >
        <FaAnglesLeft />
      </Button>
      <Button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        color="gray"
        variant="soft"
      >
        <FaAngleLeft />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        color="gray"
        variant="soft"
      >
        <FaAngleRight />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(pageCount)}
        color="gray"
        variant="soft"
      >
        <FaAnglesRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
