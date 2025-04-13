"use client";

import React from "react";

interface Props {
  //seatUsages: SeatUsage[];
  totalUsagesNum: number;
  totalUsersNum: number;
}

const ScoreDisplayForm: React.FC<Props> = ({
  //seatUsages
  totalUsagesNum,
  totalUsersNum,
}) => {
  /*
  const [totalUsagesNum, setTotalUsagesNum] = useState(0);
  const [totalUsersNum, setTotalUsersNum] = useState(0);

  // 利用数
  setTotalUsagesNum(seatUsages.length);

  // 利用者数
  const distinctIds = new Set(seatUsages.map(item => item.users.id));
  setTotalUsersNum(distinctIds.size);
*/

  return (
    <div className="border-neutral-content mx-auto mt-[1.5em] max-w-[450px] border-1 py-[15px]">
      <div className="columns-2 text-center">
        <div className="w-full">
          利用数：<b className="text-[1.5em]">{totalUsagesNum}</b>
        </div>
        <div className="w-full">
          利用者数：<b className="text-[1.5em]">{totalUsersNum}</b>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplayForm;
