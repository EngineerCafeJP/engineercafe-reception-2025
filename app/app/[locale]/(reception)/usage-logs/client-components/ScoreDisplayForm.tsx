"use client";

import React from "react";
import { SeatUsage } from "@/app/types";

interface Props {
  seatUsages: SeatUsage[];
}

const ScoreDisplayForm: React.FC<Props> = ({ seatUsages }) => {
  const totalUsagesNum = seatUsages.length;
  const totalUsersNum = new Set(seatUsages.map((item) => item.user.id)).size;

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
