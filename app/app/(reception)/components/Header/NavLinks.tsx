import Link from "next/link";
import { navLinks } from "@/app/(reception)/components/Header/nav-links";

export default function NavLinks() {
  return navLinks.map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        onClick={() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }}
      >
        {link.label}
      </Link>
    </li>
  ));
}
