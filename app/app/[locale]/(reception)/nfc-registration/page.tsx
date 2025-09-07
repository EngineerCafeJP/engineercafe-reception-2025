"use client";

import dynamic from "next/dynamic";
import { useSession } from "@/hooks/use-session";

const NfcRegistrationPage = dynamic(() => import("./NfcRegistrationPage"), {
  ssr: false,
});

export default function Page() {
  useSession(true);

  return <NfcRegistrationPage />;
}
