"use client";

import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, User } from "@/types";
import { addHours, formatTimeWithQuarter } from "@/utils/format-time";

interface AssignSeatConfirmBoxProps {
  user: User;
  seat: Seat;
  startTime: string;
  onChangeStartTime: (startTime: string) => void;
  onClose: () => void;
  onAssignSeat: (startTime: string) => void;
}

export const AssignSeatConfirmBox: React.FC<AssignSeatConfirmBoxProps> = ({
  user,
  seat,
  startTime,
  onChangeStartTime,
  onClose,
  onAssignSeat,
}) => {
  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":");
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    onChangeStartTime(date.toISOString());
  };

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
              <div className="text-base-content flex items-center align-[middle] text-[1.25rem]">
                <div>{`${user.id} ${user.name}`}</div>
              </div>
            </li>
            <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="flex items-center align-[middle] text-[1.25rem]">
                <div>
                  <input
                    className="input input-bordered mr-8 cursor-pointer text-xl"
                    type="time"
                    value={formatTimeWithQuarter(startTime)}
                    onChange={(e) => handleChangeStartTime(e)}
                  />
                </div>
                <div className="mx-4">-</div>
                <div className="text-base-content">
                  {`${formatTimeWithQuarter(addHours(startTime, 2))}`}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-around">
          <button className="btn btn-secondary" onClick={onClose}>
            閉じる
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onAssignSeat(startTime)}
          >
            はい
          </button>
        </div>
      </div>
    </div>
  );
};
