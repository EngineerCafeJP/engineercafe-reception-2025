"use client";

import React from "react";
import SeatCardSkeleton from "@/[locale]/(reception)/home/client-components/SeatCardSkeleton";
import { Seat, SeatUsage } from "@/types";
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
        {seats.length === 0
          ? Array.from({ length: maxCol + 1 }).map((_, index) => (
              <SeatCardSkeleton key={index} />
            ))
          : seats.map((seat, index) => (
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
