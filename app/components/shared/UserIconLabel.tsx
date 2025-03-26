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

  const isVisibleMembershipNumber = membershipNumberText;
  const isVisibleUserName = userNameText;

  return (
    <div className={`flex flex-row gap-1 h-[${iconSize}px]`}>
      <Image
        alt="User"
        height={iconSize}
        src={"/images/mock.png"}
        style={iconStyle}
        width={iconSize}
      />
      {isVisibleMembershipNumber && (
        <div style={textStyle} title={membershipNumberText}>
          {membershipNumberText}
        </div>
      )}
      {isVisibleUserName && (
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
