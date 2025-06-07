"use client";

import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, User } from "@/types";
import { addHours, formatTimeWithQuarter } from "@/utils/format-time";

interface AssignSeatConfirmBoxProps {
  user: User;
  seat: Seat;
  onClose: () => void;
  onAssignSeat: () => void;
}

export const AssignSeatConfirmBox: React.FC<AssignSeatConfirmBoxProps> = ({
  user,
  seat,
  onClose,
  onAssignSeat,
}) => {
  const startTime = new Date().toISOString();
  return (
    <div className="modal-box border-primary border-2 p-[0]">
      <div className="flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        座席を割り当てますか？
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
                <div>{`${user.id} ${user.name}`}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>{`${formatTimeWithQuarter(startTime)} - ${formatTimeWithQuarter(addHours(startTime, 2))}`}</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-around">
          <button className="btn btn-secondary" onClick={onClose}>
            閉じる
          </button>
          <button className="btn btn-primary" onClick={onAssignSeat}>
            はい
          </button>
        </div>
      </div>
    </div>
  );
};
