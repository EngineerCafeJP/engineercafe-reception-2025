"use client";

import { useEffect } from "react";
import { useInUsageLogsSearchLogs } from "@/app/(reception)/hooks/use-in-usage-logs-search-logs";
import HistoryListViewItemForm from "@/app/(reception)/usage-logs/client-components/HistoryListViewItemForm";
import { SeatUsage } from "@/app/types";

interface Props {
  targetDate: Date;
  onHistoryRefreshed: (seatUsages: SeatUsage[]) => void;
  onDeleteHistory: (displayRowNo: number, deleteItem: SeatUsage) => void;
}

const HistoryListViewForm: React.FC<Props> = ({
  targetDate,
  onHistoryRefreshed,
  onDeleteHistory,
}) => {
  const {
    seatUsages,
    isLoading: seatUsagesLoading,
    error: seatUsagesError,
  } = useInUsageLogsSearchLogs(false, targetDate);

  useEffect(() => {
    onHistoryRefreshed(seatUsages);
  });

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
