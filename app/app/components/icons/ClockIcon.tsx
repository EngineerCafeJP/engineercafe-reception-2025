import Image from "next/image";
import React from "react";
import icon from "./ri_time-line.svg";

const ClockIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Image alt="clock" height={size} src={icon} width={size} />
);

export default ClockIcon;
