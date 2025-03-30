"use client";

import React from "react";
import ClockIcon from "@/app/components/icons/ClockIcon";
import SeatIcon from "@/app/components/icons/SeatIcon";
import UserIcon from "@/app/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/app/types";
import formatTime from "@/utils/formatTime";

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
      className={`card card-xs card-border ${seatUsage?.userCode ? "border-accent bg-accent/30" : "border-primary"} h-[7rem] w-[7rem]`}
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
