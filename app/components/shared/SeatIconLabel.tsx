"use client";

import Image from "next/image";

interface Props {
  iconSize: number;
  textSize: string;
  areaText: string | null;
  seatText: string | null;
}

const SeatIconLabel: React.FC<Props> = ({
  iconSize,
  textSize,
  areaText,
  seatText,
}) => {
  const iconStyle = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    margin: "0",
  };

  const textStyle = {
    fontSize: `${textSize}`,
    marginLeft: "0.3em",
  };

  const isVisibleArea = areaText;
  const isVisibleSeat = seatText;

  return (
    <div className={`flex flex-row gap-1 h-[${iconSize}px]`}>
      <Image
        alt="Seat"
        height={iconSize}
        src={"/images/mock.png"}
        style={iconStyle}
        width={iconSize}
      />
      {isVisibleArea && (
        <div style={textStyle} title={areaText}>
          {areaText}
        </div>
      )}
      {isVisibleSeat && (
        <div style={textStyle} title={seatText}>
          {seatText}
        </div>
      )}
    </div>
  );
};

export default SeatIconLabel;
