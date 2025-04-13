"use client";

import { useInUsageLogsSearchLogs } from "@/app/(reception)/hooks/use-in-usage-logs-search-logs";
import HistoryListViewItemForm from "@/app/(reception)/usage-logs/client-components/HistoryListViewItemForm";
import { SeatUsage } from "@/app/types";

interface Props {
  targetDate: Date;
  //listViewItemEntities: SeatUsage[];
  onDeleteHistory: (displayRowNo: number, deleteItem: SeatUsage) => void;
}

const HistoryListViewForm: React.FC<Props> = ({
  targetDate,
  //listViewItemEntities,
  onDeleteHistory,
}) => {
  //const [seatUsages, set]
  // TODO: (KUROKI) DB検索して資料数・利用者数をリフレッシュ
  const {
    seatUsages,
    isLoading: seatUsagesLoading,
    error: seatUsagesError,
    //fetch: fetchSeatUsageLogsByStartTime,
  } = useInUsageLogsSearchLogs(false, targetDate);

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
