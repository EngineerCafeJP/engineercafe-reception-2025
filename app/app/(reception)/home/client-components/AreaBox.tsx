"use client";

import React from "react";
import { Seat, SeatUsage } from "@/app/types";
import SeatCard from "./SeatCard";

export interface AreaBoxProps {
  areaName: string;
  seats: Seat[];
  maxCol: number;
  seatUsages: SeatUsage[];
  onSeatClick: (seat: Seat, seatUsage: SeatUsage | null) => void;
}

export const AreaBox: React.FC<AreaBoxProps> = ({
  areaName,
  maxCol,
  seats,
  seatUsages,
  onSeatClick,
}) => {
  return (
    <div className="my-[1rem] w-fit">
      <div className="text-[1rem] font-bold">{areaName}</div>

      <div
        className={`grid gap-[0.5rem]`}
        style={{ gridTemplateColumns: `repeat(${maxCol}, 1fr)` }}
      >
        {seats.map((seat, index) => (
          <SeatCard
            key={index}
            seat={seat}
            seatUsage={
              seatUsages.find((usage) => usage.seatId === seat.id) || null
            }
            onSeatClick={onSeatClick}
          />
        ))}
      </div>
    </div>
  );
};
