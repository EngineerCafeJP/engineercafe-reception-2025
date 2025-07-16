import Link from "next/link";
import { MdEdit, MdNfc } from "react-icons/md";
import DisplayLimitInput from "@/[locale]/(reception)/user-search/components/DisplayLimitInput";
import SeatIcon from "@/components/icons/SeatIcon";
import { User } from "@/types";

type Props = {
  users: User[];
  onEditClicked: (user: User) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

export default function UserList({
  users,
  onEditClicked,
  limit,
  setLimit,
}: Props) {
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl font-bold">検索結果</h2>
        <DisplayLimitInput limit={limit} onLimitChange={setLimit} />
      </div>
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow"
            >
              <div>
                <p className="text-lg font-semibold">会員番号: {user.id}</p>
                <p className="font-medium text-gray-800">名前: {user.name}</p>
                <p className="text-gray-600">フリガナ: {user.pronunciation}</p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-500">電話番号: {user.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onEditClicked(user)}
                >
                  <MdEdit size={20} />
                  編集
                </button>
                <Link
                  className="btn btn-sm btn-secondary"
                  href={`/home?userId=${user.id}`}
                >
                  <SeatIcon size={20} />
                  受付
                </Link>
                <Link
                  className="btn btn-sm btn-accent"
                  href={`/nfc-registration?userId=${user.id}`}
                >
                  <MdNfc size={20} />
                  NFC登録
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">該当ユーザが見つかりませんでした。</p>
      )}
    </div>
  );
}
