import Link from "next/link";
import { Fragment } from "react";
import AccountMenu from "@/app/(reception)/components/Header/AccountMenu";
import { navLinks } from "@/app/(reception)/components/Header/nav-links";

export default function InlineNavigation() {
  return (
    <ul className="menu menu-horizontal hidden items-center xl:flex">
      {navLinks.map((link) => (
        <Fragment key={link.href}>
          <li>
            <Link href={link.href}>{link.label}</Link>
          </li>
          <div className="divider divider-horizontal mx-0" />
        </Fragment>
      ))}
      <li>
        <AccountMenu />
      </li>
    </ul>
  );
}
