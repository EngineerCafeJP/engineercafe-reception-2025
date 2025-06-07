"use client";

import React from "react";
import ClockIcon from "@/app/components/icons/ClockIcon";
import SeatIcon from "@/app/components/icons/SeatIcon";
import UserIcon from "@/app/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/app/types";
import { addHours, formatTimeWithQuarter } from "@/app/utils/format-time";

export interface SeatProps {
  seat: Seat;
  seatUsage: SeatUsage | null;
  onSeatClick: (seat: Seat, seatUsage: SeatUsage | null) => void;
}

const SeatCard: React.FC<SeatProps> = ({
  seat,
  seatUsage = null,
  onSeatClick,
}) => {
  return (
    <div
      className={`card card-xs card-border ${seatUsage?.userId ? "border-accent bg-accent/30" : "border-primary"} h-[8rem] w-[7rem] cursor-pointer`}
      onClick={() => onSeatClick(seat, seatUsage)}
    >
      <div className="card-body">
        <div className="flex flex-row items-center gap-[0.125rem]">
          <SeatIcon />
          <div>
            <div className="text-[0.675rem]">{seat.name.split(":")[0]}</div>
            <div className="text-lg">{seat.name.split(":")[1]}</div>
          </div>
        </div>
        {seatUsage?.userId && (
          <>
            <div className="flex flex-row items-center gap-[0.125rem]">
              <UserIcon />
              <div className="text-base">{seatUsage.userId}</div>
            </div>
            <div className="flex flex-row items-center gap-[0.125rem]">
              <ClockIcon />
              <div className="text-xs">
                {`${formatTimeWithQuarter(seatUsage.startTime)} - ${formatTimeWithQuarter(addHours(seatUsage.startTime, 2))}`}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeatCard;
