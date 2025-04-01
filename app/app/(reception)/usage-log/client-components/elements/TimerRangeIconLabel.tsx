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

  return (
    <div className={`flex flex-row gap-1 h-[${iconSize}px]`}>
      <Image
        alt="Timer"
        height={iconSize}
        src={"/images/mock.png"}
        style={iconStyle}
        width={iconSize}
      />
      {timeStartText && (
        <div style={textStyle} title={timeStartText}>
          {timeStartText}
        </div>
      )}
      {timeStartText && (
        <div className="text-center" style={textStyle}>
          ~
        </div>
      )}
      {timeEndText && (
        <div style={textStyle} title={timeEndText}>
          {timeEndText}
        </div>
      )}
    </div>
  );
};

export default TimerRangeIconLabel;
