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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(event.target.value);
  };

  useEffect(() => {
    onHistoryDateChanged(inputedDate);
  }, [inputedDate]);

  return (
    <div className="mt-[1.5em] flex items-center justify-center">
      <input
        className="border-transparent bg-transparent text-[1.5em]"
        type="date"
        value={inputedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateSelectorForm;
