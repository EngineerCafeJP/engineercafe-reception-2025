"use client";

import { format } from "date-fns";
import { useState } from "react";
import { useInUsageLogs } from "@/app/(reception)/hooks";
import DeleteHistoryItemConfirmModal from "@/app/(reception)/usage-logs/client-components/DeleteHistoryItemConfirmModal";
import { SeatUsage } from "@/app/types";
import DateSelectorForm from "./client-components/DateSelectorForm";
import HistoryListViewForm from "./client-components/HistoryListViewForm";
import PageTitleForm from "./client-components/PageTitleForm";
import ScoreDisplayForm from "./client-components/ScoreDisplayForm";

export default function UsageHistory() {
  // 履歴の標示対象日付
  const [targetDate, setTargetDate] = useState(new Date());

  // 削除対象アイテム 及び その行番号
  const [deleteItemDisplayRowNo, setDeleteHistoryItemDisplayRowNo] = useState<
    number | null
  >(null);
  const [deleteItem, setDeleteHistoryItem] = useState<SeatUsage | null>(null);

  const {
    seatUsages,
    isLoading,
    error,
    fetchUsageLogs,
    updateUsageLogsIsDeleted,
  } = useInUsageLogs(targetDate);

  const onHistoryDateChanged = (date: Date) => {
    setTargetDate(date);
    fetchUsageLogs(false, date);
  };

  /** 履歴レコードの削除ボタンクリック処理 */
  const onDeleteHistory = (displayRowNo: number, deleteItem: SeatUsage) => {
    if (isLoading || !displayRowNo || !deleteItem) return;

    setDeleteHistoryItemDisplayRowNo(displayRowNo);
    setDeleteHistoryItem(deleteItem);
  };

  /** 履歴削除処理を実行 */
  const onAppliedDeleteHistory = async () => {
    if (isLoading || !deleteItem) return;

    await updateUsageLogsIsDeleted(deleteItem?.id, true);
    fetchUsageLogs(false, targetDate);

    // キャッシュクリア
    setDeleteHistoryItemDisplayRowNo(null);
    setDeleteHistoryItem(null);
  };
  /** 履歴削除処理をキャンセル */
  const onCanceledDeleteHistory = () => {
    setDeleteHistoryItemDisplayRowNo(null);
    setDeleteHistoryItem(null);
  };

  return (
    <div className="container mx-auto mt-[1rem] max-w-[810px] p-4">
      <PageTitleForm />

      <DateSelectorForm
        systemDate={format(targetDate, "yyyy-MM-dd")}
        onHistoryDateChanged={onHistoryDateChanged}
      />

      <ScoreDisplayForm seatUsages={seatUsages} />

      <HistoryListViewForm
        seatUsages={seatUsages}
        onDeleteHistory={onDeleteHistory}
      />

      {/* 履歴削除の確認ダイアログ */}
      {deleteItem && deleteItemDisplayRowNo && (
        <DeleteHistoryItemConfirmModal
          displayRowNo={deleteItemDisplayRowNo}
          isOpen={Boolean(deleteItem) && Boolean(deleteItemDisplayRowNo)}
          seatUsage={deleteItem}
          onApplied={onAppliedDeleteHistory}
          onCanceled={onCanceledDeleteHistory}
        />
      )}

      {isLoading && (
        <span className="z-index-1000 loading loading-spinner loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
    </div>
  );
}
