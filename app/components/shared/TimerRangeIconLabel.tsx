"use client";

import Image from "next/image";

interface Props {
  iconOpacity: number;
  iconSize: number;
  textSize: string;
  timeStartText: string | null;
  timeEndText: string | null;
}

const TimerRangeIconLabel: React.FC<Props> = ({
  iconOpacity,
  iconSize,
  textSize,
  timeStartText,
  timeEndText,
}) => {
  const iconStyle = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    margin: "0",
    opacity: iconOpacity,
  };

  const textStyle = {
    fontSize: `${textSize}`,
    marginLeft: "0.3em",
  };

  const isVisibleTimeStart = timeStartText;
  const isVisibleTimeEnd = timeEndText;

  return (
    <div className={`flex flex-row gap-1 h-[${iconSize}px]`}>
      <Image
        alt="Timer"
        height={iconSize}
        src={"/images/mock.png"}
        style={iconStyle}
        width={iconSize}
      />
      {isVisibleTimeStart && (
        <div style={textStyle} title={timeStartText}>
          {timeStartText}
        </div>
      )}
      {isVisibleTimeStart && (
        <div className="text-center" style={textStyle}>
          ~
        </div>
      )}
      {isVisibleTimeEnd && (
        <div style={textStyle} title={timeEndText}>
          {timeEndText}
        </div>
      )}
    </div>
  );
};

export default TimerRangeIconLabel;
