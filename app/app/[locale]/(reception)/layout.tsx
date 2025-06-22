"use client";

import Header from "@/[locale]/(reception)/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "~/i18n/navigation";

export default function ReceptionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = useAuth();
  if (!session) {
    redirect({ href: "/sign-in", locale: "ja" });
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
}
