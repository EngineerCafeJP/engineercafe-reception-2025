import clsx from "clsx";
import { LuClipboardCopy } from "react-icons/lu";
import { LatestUser } from "@/app/(reception)/nfc-registration/types";
import { formatDateTime } from "@/app/utils/format-date-time";

type LatestUserIdProps = {
  className?: string;
  isLoading: boolean;
  latestUser: LatestUser;
  onUserIdCopy: (userId: number) => void;
};

export default function LatestUserId({
  className,
  isLoading,
  latestUser,
  onUserIdCopy,
}: LatestUserIdProps) {
  const LoadingSpinner = (
    <span className="loading loading-spinner loading-md" />
  );

  return (
    <div className={clsx("place-items-end", className)}>
      <div className="stat-title">
        最新のユーザーID
        <br />
        (登録日時:{" "}
        {isLoading ? LoadingSpinner : formatDateTime(latestUser.createdAt)})
      </div>
      <div className="stat-value">
        {isLoading ? LoadingSpinner : latestUser.id}
      </div>
      <div className="stat-actions">
        <button
          className="btn btn-xs"
          disabled={isLoading}
          type="button"
          onClick={() => onUserIdCopy(latestUser.id)}
        >
          <LuClipboardCopy />
          このユーザーIDを使用する
        </button>
      </div>
    </div>
  );
}
