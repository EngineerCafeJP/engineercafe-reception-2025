"use client";

import { FC } from "react";

interface DateSelectFormProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

const DateSelectForm: FC<DateSelectFormProps> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <div className="mb-4 mb-8 flex items-center justify-center gap-4">
      <input
        className="input"
        defaultValue={selectedDate}
        type="date"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateSelectForm;
