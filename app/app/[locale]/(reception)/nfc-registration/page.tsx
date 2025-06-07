"use client";

import dynamic from "next/dynamic";

const NfcRegistrationPage = dynamic(() => import("./NfcRegistrationPage"), {
  ssr: false,
});

export default function Page() {
  return <NfcRegistrationPage />;
}
