import Image from "next/image";
import React from "react";
import icon from "./mdi_user.svg";

const SeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Image alt="User" height={size} src={icon} width={size} />
);

export default SeatIcon;
