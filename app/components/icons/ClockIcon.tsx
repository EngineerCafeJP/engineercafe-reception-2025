import React from 'react';
import Image from 'next/image';
import icon from './ri_time-line.svg'

const ClockIcon: React.FC<{ size?: number }> = ({ size = 16 }) =>
    <Image src={icon} alt="clock" width={size} height={size} />

export default ClockIcon;
