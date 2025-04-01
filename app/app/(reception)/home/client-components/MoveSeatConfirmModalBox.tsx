"use client";

import React from "react";
import ClockIcon from "@/app/components/icons/ClockIcon";
import SeatIcon from "@/app/components/icons/SeatIcon";
import UserIcon from "@/app/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/app/types";
import { addHours, formatTimeWithQuarter } from "@/utils/formatTime";

interface MoveSeatConfirmModalBoxProps {
  prevSeat: Seat;
  nextSeat: Seat;
  nextSeatUsage: SeatUsage;
  onClose: () => void;
  onNextButtonClick: () => void;
}

export const MoveSeatConfirmModalBox: React.FC<
  MoveSeatConfirmModalBoxProps
> = ({ prevSeat, nextSeat, nextSeatUsage, onClose, onNextButtonClick }) => {
  return (
    <div className="modal-box border-accent border-2 p-[0]">
      <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        座席移動
      </div>
      <div className="flex flex-col gap-[1rem] p-[1rem] p-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <div>席を移動ます。よろしいですか？</div>
          <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <SeatIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${prevSeat.name} ->`}</div>
                <div className="text-accent">{`${nextSeat.name}`}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <UserIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{nextSeatUsage.userId}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${formatTimeWithQuarter(nextSeatUsage.startTime)} - ${formatTimeWithQuarter(addHours(nextSeatUsage.startTime, 2))}`}</div>
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
