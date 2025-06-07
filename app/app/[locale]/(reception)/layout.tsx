import Header from "@/[locale]/(reception)/components/Header";
import { AuthProvider } from "@/[locale]/(reception)/contexts/AuthContext";

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
