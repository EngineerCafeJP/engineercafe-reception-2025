"use client";

import Header from "@/[locale]/(reception)/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function ReceptionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = useAuth();

  return (
    <>
      <Header isCm={session?.user.app_metadata?.is_cm} />
      {children}
    </>
  );
}
