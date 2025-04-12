import { ReactNode } from "react";

export default function RegistrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-2xl p-8">{children}</div>
    </div>
  );
}
