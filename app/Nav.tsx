"use client";
import { Avatar, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";

const Nav = () => {
  const { data } = useSession();
  const currentPath = usePathname();
  const navItems = [
    { id: 1, label: "Dashboard", path: "/" },
    { id: 2, label: "Issues", path: "/issues" },
  ];

  const setNavClassName = (path: string) => {
    let classes = "hover:text-zinc-900 transition-colors ";
    return path === currentPath
      ? (classes += "text-zinc-900")
      : (classes += "text-zinc-400");
  };

  return (
    <nav className="border-b mb-6 px-2 md:px-0">
      <Container>
        <Flex
          align="center"
          gap="4"
          className="h-14"
          justify="between"
          width="100%"
        >
          <Flex align="center" gap="4">
            <Link href="/" className="text-2xl">
              <IoBug />
            </Link>
            <ul className="flex items-center gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link className={setNavClassName(item.path)} href={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          {data?.user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button>
                  <Avatar
                    size="2"
                    radius="full"
                    src={data.user.image!}
                    fallback={data.user.name!}
                  />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label> {data.user.name} </DropdownMenu.Label>
                <DropdownMenu.Label> {data.user.email} </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Signout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Flex>
      </Container>
    </nav>
  );
};

export default Nav;
