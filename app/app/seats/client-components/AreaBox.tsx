'use client';

import { Seat, SeatUsage } from '@/app/types';

import React from 'react';
import SeatCard from './SeatCard';

export interface AreaBoxProps {
  areaName: string;
  seats: Seat[];
  maxCol: number;
  seatUsages: SeatUsage[];
}

export const AreaBox: React.FC<AreaBoxProps> = ({ areaName, maxCol,  seats, seatUsages }) => {

  return (
    <div className="w-fit my-[1rem]">
      <div className="text-[1rem] font-bold">{areaName}</div>

      <div className={`grid gap-[0.5rem]`} style={{ gridTemplateColumns: `repeat(${maxCol}, 1fr)` }}>
      {seats.map((seat, index) => (
          <SeatCard key={index} seat={seat} seatUsage={seatUsages.find(usage => usage.seatId === seat.id) || null} />
        ))}
      </div>
    </div>
  );
};
