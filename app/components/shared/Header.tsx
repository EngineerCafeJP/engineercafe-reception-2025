"use client";

import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";

const Header: React.FC = () => {
  const { session, signOut } = useAuth();

  return (
    <header className="navbar bg-base-100 h-[80px] border-b-2 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="item-center flex">
          <Image
            alt="Logo"
            className="mx-2 my-auto"
            height={60}
            src="/images/logo.png"
            width={60}
          />
          <a>
            <h1 className="ml-[8px] text-[1.5rem]">エンジニアカフェ受付</h1>
          </a>
        </div>
        {session && (
          <div className="item-center flex">
            <button className="btn btn-primary" onClick={signOut}>
              ログアウト
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
