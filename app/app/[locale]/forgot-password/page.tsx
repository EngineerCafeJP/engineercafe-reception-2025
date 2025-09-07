"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ForgotPasswordForm from "./client-components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const { session } = useAuth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto mt-[8rem]">
      <ForgotPasswordForm />
    </div>
  );
}
