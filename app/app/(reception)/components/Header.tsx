"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { MdMenu } from "react-icons/md";
import { useAuth } from "@/app/(reception)/contexts/AuthContext";

const navLinks = [
  {
    label: "ユーザー検索",
    href: "/user-search",
  },
  {
    label: "利用履歴",
    href: "/usage-logs",
  },
  {
    label: "レポート",
    href: "/reports",
  },
  {
    label: "カード (NFC) 登録",
    href: "/nfc-registration",
  },
];

function AccountMenu() {
  const { session, signOut } = useAuth();

  if (!session) {
    return (
      <Link
        className="btn btn-primary btn-sm"
        href="/sign-in"
        onClick={() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }}
      >
        ログイン
      </Link>
    );
  }

  return (
    <div className="dropdown xl:dropdown-end">
      <div role="button" tabIndex={0}>
        {session.user.email}
      </div>
      <ul
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        tabIndex={0}
      >
        <li>
          <button className="btn btn-ghost" onClick={signOut}>
            ログアウト
          </button>
        </li>
      </ul>
    </div>
  );
}

function NavLinks() {
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

function CollapsibleNavigation() {
  return (
    <div className="dropdown">
      <div className="btn btn-ghost xl:hidden" role="button" tabIndex={0}>
        <MdMenu size="1.5rem" />
      </div>
      <ul
        className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        tabIndex={0}
      >
        <NavLinks />
        <li className="mt-1">
          <AccountMenu />
        </li>
      </ul>
    </div>
  );
}

function InlineNavigation() {
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

export default function Header() {
  return (
    <header className="navbar bg-base-100 border-b-2 shadow-md">
      <div className="navbar-start">
        <CollapsibleNavigation />
        <Link className="btn btn-ghost btn-lg font-bold" href="/home">
          <Image
            alt="Logo"
            height={60}
            src="/images/EngineerCafe_logo_white_transparent.png"
            width={60}
          />
          エンジニアカフェ受付
        </Link>
      </div>
      <div className="navbar-end">
        <InlineNavigation />
      </div>
    </header>
  );
}
