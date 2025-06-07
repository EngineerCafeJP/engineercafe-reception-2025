"use client";

import React from "react";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat } from "@/types";

interface EmptySeatModalBoxProps {
  seat: Seat;
  onClose: () => void;
}

export const EmptySeatModalBox: React.FC<EmptySeatModalBoxProps> = ({
  seat,
  onClose,
}) => {
  return (
    <div className="modal-box border-primary border-2 p-[0]">
      <div className="bg-primary text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        空席
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
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <UserIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div></div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div></div>
              </div>
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
