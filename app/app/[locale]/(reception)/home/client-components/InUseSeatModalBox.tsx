"use client";

import { useKey } from "react-use";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/types";
import { addHours, formatTimeWithQuarter } from "@/utils/format-time";

interface InUseSeatModalBoxProps {
  seat: Seat;
  seatUsage: SeatUsage;
  onClose: () => void;
  onMoveSeatClick: () => void;
  onLeaveSeatClick: () => void;
  onExtendSeatClick: () => void;
}

export const InUseSeatModalBox: React.FC<InUseSeatModalBoxProps> = ({
  seat,
  seatUsage,
  onClose,
  onMoveSeatClick,
  onLeaveSeatClick,
  onExtendSeatClick,
}) => {
  useKey("Escape", onClose, undefined, [onClose]);

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
              <button className="btn" onClick={onMoveSeatClick}>
                移動
              </button>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <UserIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{seatUsage.userId}</div>
                <div className="ml-2">{seatUsage.user?.name}</div>
              </div>
              <button className="btn" onClick={onLeaveSeatClick}>
                退席
              </button>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${formatTimeWithQuarter(seatUsage.startTime)} - ${formatTimeWithQuarter(addHours(seatUsage.startTime, 2))}`}</div>
              </div>
              <button className="btn" onClick={onExtendSeatClick}>
                延長
              </button>
            </li>
          </ul>
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
