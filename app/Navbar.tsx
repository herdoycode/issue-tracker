"use client";
import { Container } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const currentPath = usePathname();
  const navLinks = [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/issues", label: "Issues" },
  ];

  const linkClass = (link: string) => {
    let classes = "hover:text-zinc-900 transition-colors text-zinc-";
    return currentPath === link ? (classes += "900") : (classes += "500");
  };

  return (
    <Container className="border-b mb-5">
      <nav className="flex items-center gap-4 py-4">
        <Link className="text-2xl" href="/">
          <IoBug />
        </Link>
        <ul className="flex items-center gap-3">
          {navLinks.map(({ label, link }) => (
            <li>
              <Link className={linkClass(link)} key={label} href={link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
};

export default Navbar;
