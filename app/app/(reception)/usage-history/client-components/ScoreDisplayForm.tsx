"use client";

import React from "react";
//import { createClient } from "@supabase/supabase-js";

interface Props {
  socoreOfUsages: number;
  socoreOfUsers: number;
}

const ScoreDisplayForm: React.FC<Props> = ({
  socoreOfUsages,
  socoreOfUsers,
}) => {
  return (
    <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[400px] max-w-[430px] border-1 py-[15px]">
      <div className="columns-2 text-center">
        <div className="w-full">本日の利用数：{socoreOfUsages}</div>
        <div className="w-full">本日の利用者数：{socoreOfUsers}</div>
      </div>
    </div>
  );
};

export default ScoreDisplayForm;
