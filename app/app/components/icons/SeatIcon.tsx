import Image from "next/image";
import React from "react";
import icon from "./seat_icon.svg";

const SeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Image alt="Seat" height={size} src={icon} width={size} />
);

export default SeatIcon;
