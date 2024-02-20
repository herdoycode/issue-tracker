"use client";
import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";

const Nav = () => {
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
        <Flex align="center" gap="4" className="h-14">
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
      </Container>
    </nav>
  );
};

export default Nav;
