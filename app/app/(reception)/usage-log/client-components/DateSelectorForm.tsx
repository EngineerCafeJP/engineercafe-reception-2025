"use client";

import React, { useState, useEffect } from "react";

interface Props {
  systemDate: string;
  onHistoryDateChanged: (dateStr: string) => void;
}

const DateSelectorForm: React.FC<Props> = ({
  systemDate,
  onHistoryDateChanged,
}) => {
  const [inputedDate, setTargetDate] = useState(systemDate);

  const incrementDate = (date: Date, days: number): Date => {
    const newDate = new Date(date); // 元のDateオブジェクトをコピー
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const downCount = () => {
    const tmpDate = new Date(inputedDate);
    const newDate = incrementDate(tmpDate, -1);

    setTargetDate(newDate.toISOString().split("T")[0]);
  };

  const upCount = () => {
    const tmpDate = new Date(inputedDate);
    const newDate = incrementDate(tmpDate, 1);

    setTargetDate(newDate.toISOString().split("T")[0]);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(event.target.value);
  };

  // useEffect_3
  useEffect(() => {
    onHistoryDateChanged(inputedDate);
  }, [inputedDate]);

  return (
    <div className="mt-[1.5em] flex items-center justify-center">
      <button
        className="mx-[0.3em] rounded-full border-transparent bg-transparent px-[1em] py-[0.3em] text-[1.5em]"
        onClick={downCount}
      >
        &lt;
      </button>
      <input
        className="border-transparent bg-transparent text-[1.5em]"
        type="date"
        value={inputedDate}
        onChange={handleDateChange}
      />

      <button
        className="mx-[0.3em] rounded-full border-transparent bg-transparent px-[1em] py-[0.3em] text-[1.5em]"
        onClick={upCount}
      >
        &gt;
      </button>
    </div>
  );
};

export default DateSelectorForm;
