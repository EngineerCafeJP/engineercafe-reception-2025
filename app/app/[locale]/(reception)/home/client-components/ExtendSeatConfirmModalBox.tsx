"use client";

import React, { useState } from "react";
import { useKey } from "react-use";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/types";
import { addMinutes, formatTimeWithQuarter } from "@/utils/format-time";

interface ExtendSeatConfirmModalBoxProps {
  seat: Seat;
  seatUsage: SeatUsage;
  nextSeatUsage: SeatUsage;
  onChangeNextSeatUsage: (nextSeatUsage: SeatUsage) => void;
  onClose: () => void;
  onNextButtonClick: () => void;
}

export const ExtendSeatConfirmModalBox: React.FC<
  ExtendSeatConfirmModalBoxProps
> = ({
  seat,
  seatUsage,
  nextSeatUsage,
  onChangeNextSeatUsage,
  onClose,
  onNextButtonClick,
}) => {
  useKey("Escape", onClose, undefined, [onClose]);
  useKey("Enter", onNextButtonClick, undefined, [onNextButtonClick]);

  const [endTime, setEndTime] = useState<string>(
    addMinutes(nextSeatUsage.startTime, nextSeatUsage.usageDurationMinutes),
  );

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":");
    const endDate = new Date(nextSeatUsage.startTime);
    endDate.setHours(Number(hours));
    endDate.setMinutes(Number(minutes));

    // 終了時間が開始時間より前の場合は無効
    if (endDate.getTime() < new Date(nextSeatUsage.startTime).getTime()) {
      return;
    }

    const usageDurationMinutes =
      (endDate.getTime() - new Date(nextSeatUsage.startTime).getTime()) / 60000;

    setEndTime(endDate.toISOString());

    onChangeNextSeatUsage({
      ...nextSeatUsage,
      usageDurationMinutes,
    });
  };

  return (
    <div className="modal-box border-accent border-2 p-[0]">
      <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
        座席延長
      </div>
      <div className="flex flex-col gap-[1rem] p-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <div>延長させて、よろしいですか？</div>
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
                <div className="flex flex-grow-4 items-center align-[middle] text-[1rem]">
                  <div>{formatTimeWithQuarter(seatUsage.startTime)}</div>
                  <div className="mx-2">-</div>
                  <div className="text-base-content">
                    {formatTimeWithQuarter(
                      addMinutes(
                        seatUsage.startTime,
                        seatUsage.usageDurationMinutes,
                      ),
                    )}
                  </div>
                </div>
                <div className="mx-0.5 flex-grow-1"> → </div>
                <div className="flex flex-grow-4 items-center align-[middle] text-[1rem]">
                  <div className="text-accent">
                    {formatTimeWithQuarter(nextSeatUsage.startTime)}
                  </div>

                  <div className="mx-4">-</div>
                  <div className="text-base-content">
                    <input
                      className="input input-bordered mr-4 cursor-pointer p-2 pr-4"
                      style={{ color: "var(--color-accent)" }}
                      type="time"
                      value={formatTimeWithQuarter(endTime)}
                      onChange={(e) => handleChangeEndTime(e)}
                    />
                  </div>
                </div>
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
