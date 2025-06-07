"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/[locale]/(reception)/contexts/AuthContext";
import SignInForm from "@/[locale]/(reception)/sign-in/client-components/SignInForm";

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
