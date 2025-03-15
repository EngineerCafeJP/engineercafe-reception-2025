import SeatIcon from '@/components/icons/SeatIcon';
import UserIcon from '@/components/icons/UserIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import formatTime from "@/utils/formatTime";

import React from 'react';
import { Seat, SeatUsage } from '@/app/types';

interface ExtendSeatConfirmModalBoxProps {
  seat: Seat;
  seatUsage: SeatUsage;
  onClose: () => void;
  onNextButtonClick: () => void;
}


export const ExtendSeatConfirmModalBox: React.FC<ExtendSeatConfirmModalBoxProps> = ({ seat, seatUsage, onClose, onNextButtonClick }) => {
  return (
    <div className="modal-box p-[0] border-2 border-accent">
      <div className='bg-accent text-[1.25rem] font-[800] text-primary-content h-[50px] flex items-center justify-center'>
        座席延長
      </div>
      <div className='p-[1rem] flex flex-col gap-[1rem] p-[2rem]'>
        <div className='flex flex-col gap-[1rem]'>
          <div>延長させて、よろしいですか？</div>
          <ul className="list bg-base-100 rounded-box shadow-md px-[0]">
            <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
              <div><SeatIcon size={40}/></div>
              <div className='text-[1.25rem] align-[middle] flex items-center'>
                <div>{`${seat.areaName} ${seat.name}`}</div>
              </div>
            </li>
            <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
              <div><UserIcon size={40}/></div>
              <div className='text-[1.25rem] align-[middle] flex items-center'>
                <div>{seatUsage.userCode}</div>
              </div>
            </li>
            <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
              <div><ClockIcon size={40}/></div>
              <div className='text-[1.25rem] align-[middle] flex items-center'>
                <div>{`${formatTime(seatUsage.startTime)} - ${formatTime(seatUsage.endTime)}`}</div>
              </div>
            </li>
          </ul>
        </div>

        <div className='flex justify-around'>
          <button className='btn btn-secondary' onClick={onClose}>いいえ</button>
          <button className='btn btn-primary' onClick={onNextButtonClick}>はい</button>
        </div>
      </div>
    </div>
  );
};
