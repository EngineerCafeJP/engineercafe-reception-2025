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
    <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[510px] min-h-[510px] w-full overflow-y-auto border-2 p-[0.5em]">
      {seatUsages.length > 0 &&
        seatUsages.map((item, index) => (
          <HistoryListViewItemForm
            key={index + 1}
            displayRowNo={index + 1}
            item={item}
            onDeleteHistory={onDeleteHistory}
          />
        ))}
      {seatUsages.length == 0 && (
        <div className="mt-[1.5em] flex items-center justify-center">
          <b>対象データは存在しません。</b>
        </div>
      )}
    </div>
  );
};

export default HistoryListViewForm;
