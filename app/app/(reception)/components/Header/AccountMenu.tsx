import Link from "next/link";
import { useAuth } from "@/app/(reception)/contexts/AuthContext";

export default function AccountMenu() {
  const { session, signOut } = useAuth();

  if (!session) {
    return (
      <Link
        className="btn btn-primary btn-sm"
        href="/sign-in"
        onClick={() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }}
      >
        ログイン
      </Link>
    );
  }

  return (
    <div className="dropdown xl:dropdown-end">
      <div role="button" tabIndex={0}>
        {session.user.email}
      </div>
      <ul
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        tabIndex={0}
      >
        <li>
          <button className="btn btn-ghost" onClick={signOut}>
            ログアウト
          </button>
        </li>
      </ul>
    </div>
  );
}
