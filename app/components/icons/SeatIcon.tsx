import React from 'react';
import Image from 'next/image';
import icon from './seat_icon.svg';

const SeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) =>
    <Image src={icon} alt="Seat" width={size} height={size} />

export default SeatIcon;
