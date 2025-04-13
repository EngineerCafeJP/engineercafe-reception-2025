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
  const [inputedDate, setTargetDate] = useState(systemDate);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //const parsedDate = parse(event.target.value, 'yyyy-MM-dd', new Date());
    //if (parsedDate == new Date("x"))
    //  return;

    setTargetDate(event.target.value);

    const parsedDate = new Date(event.target.value);
    onHistoryDateChanged(parsedDate);
  };

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
