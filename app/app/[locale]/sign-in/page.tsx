"use client";

import { redirect } from "next/navigation";
import SignInForm from "@/[locale]/sign-in/client-components/SignInForm";
import { useAuth } from "@/contexts/AuthContext";

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
