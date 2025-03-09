import React from 'react';
import Image from 'next/image';
import icon from './mdi_user.svg'

const SeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) =>
    <Image src={icon} alt="User" width={size} height={size} />

export default SeatIcon;
