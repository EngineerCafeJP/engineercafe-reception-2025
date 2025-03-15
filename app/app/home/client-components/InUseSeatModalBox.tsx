import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import formatTime from "@/utils/formatTime";

import { Seat, SeatUsage } from "@/app/types";

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
  return (
    <div className="modal-box p-[0] border-2 border-accent">
      <div className="bg-accent text-[1.25rem] font-[800] text-primary-content h-[50px] flex items-center justify-center">
        利用中
      </div>
      <div className="p-[1rem] flex flex-col gap-[1rem] p-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <ul className="list bg-base-100 rounded-box shadow-md px-[0]">
            <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
              <div>
                <SeatIcon size={40} />
              </div>
              <div className="text-[1.25rem] align-[middle] flex items-center">
                <div>{`${seat.areaName} ${seat.name}`}</div>
              </div>
              <button className="btn" onClick={onMoveSeatClick}>
                移動
              </button>
            </li>
            <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
              <div>
                <UserIcon size={40} />
              </div>
              <div className="text-[1.25rem] align-[middle] flex items-center">
                <div>{seatUsage.userCode}</div>
              </div>
              <button className="btn" onClick={onLeaveSeatClick}>
                退席
              </button>
            </li>
            <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
              <div>
                <ClockIcon size={40} />
              </div>
              <div className="text-[1.25rem] align-[middle] flex items-center">
                <div>{`${formatTime(seatUsage.startTime)} - ${formatTime(
                  seatUsage.endTime
                )}`}</div>
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
