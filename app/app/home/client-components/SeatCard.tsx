'use client'

import React from 'react';

import SeatIcon from "@/components/icons/SeatIcon"
import UserIcon from "@/components/icons/UserIcon"
import ClockIcon from "@/components/icons/ClockIcon"
import { Seat } from '@/app/types/seat';
import { SeatUsage } from '@/app/types/seatUsage';
import formatTime from "@/utils/formatTime";

export interface SeatProps {
  seat: Seat;
  seatUsage: SeatUsage | null;
  onSeatClick: (seat: Seat, seatUsage: SeatUsage | null) => void;
}

const SeatCard: React.FC<SeatProps> = ({ seat, seatUsage = null, onSeatClick }) => {
  return (
    <div className={`card card-xs card-border ${seatUsage?.userCode ?  'border-accent bg-accent/30' : 'border-primary'} w-[6rem] h-[6rem]`} onClick={() => onSeatClick(seat, seatUsage)} >
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
              <div className="text-[0.75rem]">{formatTime(seatUsage.startTime)} - {formatTime(seatUsage.endTime)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeatCard;