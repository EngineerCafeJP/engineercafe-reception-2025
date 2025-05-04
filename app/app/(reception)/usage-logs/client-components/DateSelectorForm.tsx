"use client";

import React, { useState } from "react";

interface Props {
  systemDate: string;
  onHistoryDateChanged: (date: Date) => void;
}

const DateSelectorForm: React.FC<Props> = ({
  systemDate,
  onHistoryDateChanged,
}) => {
  const [inputedDate, setInputedDate] = useState(systemDate);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // UIに反映
    setInputedDate(event.target.value);

    // 入力値が日付に変換できない値の場合、通知せず終了する
    const value = new Date(event.target.value).toString();
    const errorValue = new Date("X").toString();
    if (value == errorValue) {
      return;
    }
    onHistoryDateChanged(new Date(event.target.value));
  };

  return (
    <div className="mt-[1.5em] flex items-center justify-center">
      <input
        className="w-[175] border-transparent bg-transparent px-2 text-[1.5em]"
        type="date"
        value={inputedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateSelectorForm;
