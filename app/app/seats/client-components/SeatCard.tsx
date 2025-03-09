'use client'

import React from 'react';
import SeatIcon from "@/components/icons/SeatIcon"
import UserIcon from "@/components/icons/UserIcon"
import ClockIcon from "@/components/icons/ClockIcon"
import { Seat } from '@/app/types/seat';
import { SeatUsage } from '@/app/types/seatUsage';

export interface SeatProps {
  seat: Seat;
  seatUsage: SeatUsage | null;
}

const SeatCard: React.FC<SeatProps> = ({ seat, seatUsage = null }) => {
  return (
    <div className="card card-xs card-border border-primary w-[6rem] h-[6rem]">
      <div className="card-body">
        <div className="flex flex-row items-center gap-[0.25rem]">
          <SeatIcon />
          <div className="text-[0.875rem]">{seat.name}</div>
        </div>
        {seatUsage?.userCode && (
          <>
            <div className="flex flex-row items-center gap-[0.25rem]">
              <UserIcon />
              <div className="text-[0.875rem]">{seatUsage.userCode}</div>
            </div>
            <div className="flex flex-row items-center gap-[0.25rem]">
              <ClockIcon />
              <div className="text-[0.75rem]">{seatUsage.startTime} - {seatUsage.endTime}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeatCard;