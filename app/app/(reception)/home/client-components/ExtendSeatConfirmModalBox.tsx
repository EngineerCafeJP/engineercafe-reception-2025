import React from "react";
import { Seat, SeatUsage } from "@/app/types";
import formatTime from "@/utils/formatTime";
import ClockIcon from "@/app/(reception)/components/icons/ClockIcon";
import SeatIcon from "@/app/(reception)/components/icons/SeatIcon";
import UserIcon from "@/app/(reception)/components/icons/UserIcon";

interface ExtendSeatConfirmModalBoxProps {
  seat: Seat;
  seatUsage: SeatUsage;
  onClose: () => void;
  onNextButtonClick: () => void;
}

export const ExtendSeatConfirmModalBox: React.FC<
  ExtendSeatConfirmModalBoxProps
> = ({ seat, seatUsage, onClose, onNextButtonClick }) => {
  return (
    <div className="modal-box border-accent border-2 p-[0]">
      <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        座席延長
      </div>
      <div className="flex flex-col gap-[1rem] p-[1rem] p-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <div>延長させて、よろしいですか？</div>
          <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <SeatIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${seat.areaName} ${seat.name}`}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <UserIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{seatUsage.userCode}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${formatTime(seatUsage.startTime)} - ${formatTime(seatUsage.endTime)}`}</div>
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
