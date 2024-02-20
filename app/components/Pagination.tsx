"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2" py="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Flex gap="2">
        <Button
          disabled={currentPage === 1}
          variant="soft"
          onClick={() => changePage(1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </Button>
        <Button
          disabled={currentPage === 1}
          variant="soft"
          onClick={() => changePage(currentPage - 1)}
        >
          <MdOutlineKeyboardArrowLeft />
        </Button>
        <Button
          disabled={currentPage === pageCount}
          variant="soft"
          onClick={() => changePage(currentPage + 1)}
        >
          <MdOutlineKeyboardArrowRight />
        </Button>
        <Button
          disabled={currentPage === pageCount}
          variant="soft"
          onClick={() => changePage(pageCount)}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
