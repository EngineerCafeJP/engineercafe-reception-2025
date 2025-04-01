"use client";

import Image from "next/image";

interface Props {
  iconSize: number;
  textSize: string;
  membershipNumberText: string | null;
  userNameText: string | null;
}

const UserIconLabel: React.FC<Props> = ({
  iconSize,
  textSize,
  membershipNumberText,
  userNameText,
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

  return (
    <div className={`flex flex-row gap-1 h-[${iconSize}px]`}>
      <Image
        alt="User"
        height={iconSize}
        src={"/images/mock.png"}
        style={iconStyle}
        width={iconSize}
      />
      {membershipNumberText && (
        <div style={textStyle} title={membershipNumberText}>
          {membershipNumberText}
        </div>
      )}
      {userNameText && (
        <div
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          style={textStyle}
          title={userNameText}
        >
          {userNameText}
        </div>
      )}
    </div>
  );
};

export default UserIconLabel;
