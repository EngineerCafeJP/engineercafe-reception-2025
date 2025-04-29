import { MdMenu } from "react-icons/md";
import AccountMenu from "@/app/(reception)/components/Header/AccountMenu";
import NavLinks from "@/app/(reception)/components/Header/NavLinks";

export default function CollapsibleNavigation() {
  return (
    <div className="dropdown">
      <div className="btn btn-ghost xl:hidden" role="button" tabIndex={0}>
        <MdMenu size="1.5rem" />
      </div>
      <ul
        className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        tabIndex={0}
      >
        <NavLinks />
        <li className="mt-1">
          <AccountMenu />
        </li>
      </ul>
    </div>
  );
}
