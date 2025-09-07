"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "~/i18n/navigation";

export function useSession(requiredSignIn: boolean = true) {
  const { session, isInitialized } = useAuth(); // redirect to sign-in if not signed in

  useEffect(() => {
    if (requiredSignIn && !session && isInitialized) {
      redirect({ href: "/sign-in", locale: "ja" });
    }
  }, [session, isInitialized, requiredSignIn]);

  return { session };
}
