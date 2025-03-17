"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import SignInForm from "./client-components/SignInForm";
import { redirect } from "next/navigation";

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
