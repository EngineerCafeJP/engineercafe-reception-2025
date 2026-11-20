"use client";

import { useMutation } from "@tanstack/react-query";
import humps from "humps";
import { useKey } from "react-use";
import { fetchUser } from "@/[locale]/(reception)/queries/users-queries";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, SeatUsage, User } from "@/types";
import { addMinutes, formatTimeWithQuarter } from "@/utils/format-time";

interface InUseSeatModalBoxProps {
  seat: Seat;
  seatUsage: SeatUsage;
  onClose: () => void;
  onEditUser: (user: User) => void;
  onMoveSeatClick: () => void;
  onLeaveSeatClick: () => void;
  onExtendSeatClick: () => void;
}

export const InUseSeatModalBox: React.FC<InUseSeatModalBoxProps> = ({
  seat,
  seatUsage,
  onClose,
  onEditUser,
  onMoveSeatClick,
  onLeaveSeatClick,
  onExtendSeatClick,
}) => {
  useKey("Escape", onClose, undefined, [onClose]);

  const {
    mutate: loadUser,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const { data, error } = await fetchUser(seatUsage.userId);
      if (error || !data || data.is_delete) {
        throw new Error("会員情報を取得できませんでした。");
      }
      return humps.camelizeKeys(data) as User;
    },
  });

  return (
    <div className="modal-box border-accent border-2 p-[0]">
      <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        利用中
      </div>
      <div className="flex flex-col gap-[1rem] p-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <SeatIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{seat.name}</div>
              </div>
              <button
                className="btn bg-black text-white"
                onClick={onMoveSeatClick}
              >
                移動
              </button>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <button
                aria-busy={isPending}
                aria-haspopup="dialog"
                aria-label={`会員情報を編集 ${seatUsage.userId} ${seatUsage.user?.name ?? ""}`}
                className="list-col-grow hover:bg-base-200 flex min-w-0 cursor-pointer items-center gap-4 rounded text-left text-[1.25rem] hover:underline disabled:opacity-60"
                disabled={isPending}
                type="button"
                onClick={() => loadUser(undefined, { onSuccess: onEditUser })}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.stopPropagation();
                }}
              >
                <span className="shrink-0">
                  <UserIcon size={40} />
                </span>
                <span className="min-w-0">
                  {seatUsage.userId} {seatUsage.user?.name}
                </span>
              </button>
              <button
                className="btn bg-warning text-white"
                onClick={onLeaveSeatClick}
              >
                退席
              </button>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${formatTimeWithQuarter(seatUsage.startTime)} - ${formatTimeWithQuarter(addMinutes(seatUsage.startTime, seatUsage.usageDurationMinutes))}`}</div>
              </div>
              <button
                className="btn bg-accent text-white"
                onClick={onExtendSeatClick}
              >
                延長
              </button>
            </li>
          </ul>
          {isError && (
            <p className="text-error text-sm" role="alert">
              会員情報を取得できませんでした。
            </p>
          )}
        </div>

        <div className="mx-auto">
          <button className="btn btn-secondary" onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
