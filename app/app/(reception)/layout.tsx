import Header from "@/app/(reception)/components/Header";
import { AuthProvider } from "@/app/(reception)/contexts/AuthContext";

export default function ReceptionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}
