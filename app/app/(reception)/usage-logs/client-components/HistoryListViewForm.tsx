"use client";

import HistoryListViewItemForm from "@/app/(reception)/usage-logs/client-components/HistoryListViewItemForm";
import { SeatUsage } from "@/app/types";

interface Props {
  isEnableDeleteItem: boolean;
  seatUsages: SeatUsage[];
  onDeleteHistory: (displayRowNo: number, deleteItem: SeatUsage) => void;
}

const HistoryListViewForm: React.FC<Props> = ({
  isEnableDeleteItem,
  seatUsages,
  onDeleteHistory,
}) => {
  return (
    <>
      <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[510px] min-h-[510px] w-full overflow-y-auto border-2 p-[0.5em]">
        {seatUsages.length > 0 &&
          seatUsages.map((item, index) => (
            <HistoryListViewItemForm
              key={index + 1}
              displayRowNo={index + 1}
              isEnableDeleteItem={isEnableDeleteItem}
              item={item}
              onDeleteHistory={onDeleteHistory}
            />
          ))}
        {seatUsages.length == 0 && (
          <div className="mt-[1.5em] flex items-center justify-center">
            <b>該当データは存在しません。</b>
          </div>
        )}
      </div>
      {!isEnableDeleteItem && seatUsages.length > 0 && (
        <span className="text-red-500">
          履歴の削除が必要な場合は管理者に依頼してください。
        </span>
      )}
    </>
  );
};

export default HistoryListViewForm;
