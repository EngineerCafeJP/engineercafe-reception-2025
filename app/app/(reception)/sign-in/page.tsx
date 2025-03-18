"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import SignInForm from "./client-components/SignInForm";

export default function SignInPage() {
  const { session, signIn } = useAuth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto mt-[8rem]">
      <SignInForm signIn={signIn} />
    </div>
  );
}
