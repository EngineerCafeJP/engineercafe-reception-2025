import clsx from "clsx";
import { LuClipboardCopy } from "react-icons/lu";
import { User } from "@/app/types";
import { formatDateTime } from "@/app/utils/format-date-time";

type LatestRegisteredUserIdProps = {
  className?: string;
  isLoading: boolean;
  latestRegisteredUser: Pick<User, "id" | "createdAt">;
  onUserIdCopy: (userId: number) => void;
};

export default function LatestRegisteredUserId({
  className,
  isLoading,
  latestRegisteredUser,
  onUserIdCopy,
}: LatestRegisteredUserIdProps) {
  const loadingSpinner = (
    <span className="loading loading-spinner loading-md" />
  );

  return (
    <div className={clsx("place-items-end", className)}>
      <div className="stat-title">
        最新のユーザーID
        <br />
        (登録日時:{" "}
        {isLoading
          ? loadingSpinner
          : formatDateTime(latestRegisteredUser.createdAt)}
        )
      </div>
      <div className="stat-value">
        {isLoading ? loadingSpinner : latestRegisteredUser.id}
      </div>
      <div className="stat-actions">
        <button
          className="btn btn-xs"
          disabled={isLoading}
          type="button"
          onClick={() => onUserIdCopy(latestRegisteredUser.id)}
        >
          <LuClipboardCopy />
          このユーザーIDを使用する
        </button>
      </div>
    </div>
  );
}
