"use client";

import React from "react";
import { Seat } from "@/app/types/seat";
import { SeatUsage } from "@/app/types/seatUsage";
import formatTime from "@/utils/formatTime";
import ClockIcon from "@/app/(reception)/components/icons/ClockIcon";
import SeatIcon from "@/app/(reception)/components/icons/SeatIcon";
import UserIcon from "@/app/(reception)/components/icons/UserIcon";

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
      className={`card card-xs card-border ${seatUsage?.userCode ? "border-accent bg-accent/30" : "border-primary"} h-[6rem] w-[6rem]`}
      onClick={() => onSeatClick(seat, seatUsage)}
    >
      <div className="card-body">
        <div className="flex flex-row items-center gap-[0.25rem]">
          <SeatIcon />
          <div className="text-[0.875rem]">{seat.name}</div>
        </div>
        {seatUsage?.userCode && (
          <>
            <div className="flex flex-row items-center gap-[0.25rem]">
              <UserIcon />
              <div className="text-[0.75rem]">{seatUsage.userCode}</div>
            </div>
            <div className="flex flex-row items-center gap-[0.25rem]">
              <ClockIcon />
              <div className="text-[0.75rem]">
                {formatTime(seatUsage.startTime)} -{" "}
                {formatTime(seatUsage.endTime)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeatCard;
