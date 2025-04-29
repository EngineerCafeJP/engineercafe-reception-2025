"use client";

import Image from "next/image";
import Link from "next/link";
import CollapsibleNavigation from "@/app/(reception)/components/Header/CollapsibleNavigation";
import InlineNavigation from "@/app/(reception)/components/Header/InlineNavigation";

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
