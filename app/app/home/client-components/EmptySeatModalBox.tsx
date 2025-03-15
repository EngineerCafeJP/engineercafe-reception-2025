import SeatIcon from '@/components/icons/SeatIcon';
import UserIcon from '@/components/icons/UserIcon';
import ClockIcon from '@/components/icons/ClockIcon';

import React from 'react';
import { Seat } from '@/app/types';

interface EmptySeatModalBoxProps {
  seat: Seat;
  onClose: () => void;
}


export const EmptySeatModalBox: React.FC<EmptySeatModalBoxProps> = ({ seat, onClose }) => {
  return (

    <div className="modal-box p-[0] border-2 border-primary">
    <div className='bg-primary text-[1.25rem] font-[800] text-primary-content h-[50px] flex items-center justify-center'>
      空席
    </div>
    <div className='p-[1rem] flex flex-col gap-[1rem] p-[2rem]'>
      <div className='flex flex-col gap-[1rem]'>
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
              <div></div>
            </div>
          </li>
          <li className="list-row border-b rounded-none border-base-300 py-[0.5rem]">
            <div><ClockIcon size={40}/></div>
            <div className='text-[1.25rem] align-[middle] flex items-center'>
              <div></div>
            </div>
          </li>
        </ul>
      </div>

      <div className='mx-auto'>
        <button className='btn btn-secondary' onClick={onClose}>閉じる</button>
      </div>
    </div>
  </div>
  );
};
