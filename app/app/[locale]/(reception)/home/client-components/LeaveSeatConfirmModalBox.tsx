"use client";

import React from "react";
import { useKey } from "react-use";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/types";
import { addMinutes, formatTimeWithQuarter } from "@/utils/format-time";

interface LeaveSeatConfirmModalBoxProps {
  seat: Seat;
  seatUsage: SeatUsage;
  onClose: () => void;
  onNextButtonClick: () => void;
}

export const LeaveSeatConfirmModalBox: React.FC<
  LeaveSeatConfirmModalBoxProps
> = ({ seat, seatUsage, onClose, onNextButtonClick }) => {
  useKey("Escape", onClose, undefined, [onClose]);
  useKey("Enter", onNextButtonClick, undefined, [onNextButtonClick]);

  return (
    <div className="modal-box border-warning border-2 p-[0]">
      <div className="bg-warning text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        退席確認
      </div>
      <div className="flex flex-col gap-[1rem] p-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <div>退席させて、よろしいですか？</div>
          <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <SeatIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{seat.name}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <UserIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{seatUsage.userId}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${formatTimeWithQuarter(seatUsage.startTime)} - ${formatTimeWithQuarter(addMinutes(seatUsage.startTime, seatUsage.usageDurationMinutes))}`}</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-around">
          <button className="btn btn-secondary" onClick={onClose}>
            いいえ
          </button>
          <button className="btn btn-primary" onClick={onNextButtonClick}>
            はい
          </button>
        </div>
      </div>
    </div>
  );
};
