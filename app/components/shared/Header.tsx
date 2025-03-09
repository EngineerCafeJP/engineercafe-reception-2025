"use client"

import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";

const Header: React.FC = () => {
  const { session, signOut } = useAuth();

  return (
    <header className="navbar bg-base-100 shadow-md p-4 h-[80px] border-b-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex item-center">
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="my-auto mx-2" />
          <a><h1 className="text-[1.5rem] ml-[8px]">エンジニアカフェ受付</h1></a>
        </div>
        {session && (
          <div className="flex item-center">
            <button className="btn btn-primary" onClick={signOut}>ログアウト</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
