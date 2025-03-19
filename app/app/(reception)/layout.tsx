import { AuthProvider } from "@/app/contexts/AuthContext";
import Header from "@/components/shared/Header";

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
