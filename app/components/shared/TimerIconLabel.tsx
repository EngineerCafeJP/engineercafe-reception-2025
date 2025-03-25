"use client";

import Image from "next/image";

interface Props {
  iconOpacity: number;
  iconSize: number;
  textSize: string;
  timeText: string | null;
}

const TimerIconLabel: React.FC<Props> = ({
  iconOpacity,
  iconSize,
  textSize,
  timeText,
}) => {
  const iconStyle = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    margin: "0",
    opacity: iconOpacity,
  };

  const textStyle = {
    fontSize: `${textSize}`,
    marginLeft: "0.5em",
  };

  //const iconClassName = `opacity-[${(iconSize > 0 ? 1 : 0.3)}]`;
  const isVisibleTime = timeText;

  return (
    <div className={`flex flex-row gap-1 h-[${iconSize}px]`}>
      <Image
        alt="Timer"
        height={iconSize}
        src={"/images/mock.png"}
        style={iconStyle}
        width={iconSize}
      />
      {isVisibleTime && (
        <div style={textStyle} title={timeText}>
          {timeText}
        </div>
      )}
    </div>
  );
};

export default TimerIconLabel;
