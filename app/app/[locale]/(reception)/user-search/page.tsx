"use client";
import { useSession } from "@/hooks/use-session";
import UserSearchPage from "./UserSearchPage";

export default function Page() {
  useSession(true);

  return <UserSearchPage />;
}
