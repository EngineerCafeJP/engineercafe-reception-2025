"use client";

import HistoryListViewItemForm from "@/app/(reception)/usage-logs/client-components/HistoryListViewItemForm";
import { SeatUsage } from "@/app/types";

interface Props {
  seatUsages: SeatUsage[];
  onDeleteHistory: (displayRowNo: number, deleteItem: SeatUsage) => void;
}

const HistoryListViewForm: React.FC<Props> = ({
  seatUsages,
  onDeleteHistory,
}) => {
  return (
    <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[510px] w-full overflow-y-auto border-2 p-[0.5em]">
      {seatUsages.map((item, index) => (
        <HistoryListViewItemForm
          key={index + 1}
          displayRowNo={index + 1}
          item={item}
          onDeleteHistory={onDeleteHistory}
        />
      ))}
    </div>
  );
};

export default HistoryListViewForm;
