"use client";
import { Avatar, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const { data, status } = useSession();
  const currentPath = usePathname();
  const navLinks = [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/issues", label: "Issues" },
  ];

  return (
    <Container className="border-b mb-5">
      <nav className="flex items-center justify-between py-4">
        <Flex align="center" gap="4">
          <Link className="text-2xl" href="/">
            <IoBug />
          </Link>
          <ul className="flex items-center gap-3">
            {navLinks.map(({ label, link }) => (
              <li key={label}>
                <Link
                  className={`hover:text-zinc-900 transition-colors ${
                    link === currentPath
                      ? "hover:text-zinc-900 transition-colors text-zinc-900"
                      : "hover:text-zinc-900 transition-colors text-zinc-500"
                  }`}
                  href={link}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        {status === "unauthenticated" ? (
          <Link href="/api/auth/signin">Signin</Link>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={data?.user?.image!}
                fallback="User image"
                size="2"
                radius="full"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item> {data?.user?.email} </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Signout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </nav>
    </Container>
  );
};

export default Navbar;
