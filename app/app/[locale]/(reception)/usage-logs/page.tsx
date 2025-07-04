"use client";

import { format } from "date-fns";
import { useMemo, useState } from "react";
import { useSeatUsageLogsByDate } from "@/[locale]/(reception)/hooks/use-in-usage-logs";
import DeleteHistoryItemConfirmModal from "@/[locale]/(reception)/usage-logs/client-components/DeleteHistoryItemConfirmModal";
import { SeatUsage } from "@/types";
import { formatDate } from "@/utils/format-date";
import DateSelectorForm from "./client-components/DateSelectorForm";
import HistoryListViewForm from "./client-components/HistoryListViewForm";
import ScoreDisplayForm from "./client-components/ScoreDisplayForm";

export default function UsageHistory() {
  // 履歴の標示対象日付
  const [targetDate, setTargetDate] = useState(new Date());
  // 削除対象アイテム番号
  const [deleteItemDisplayRowNo, setDeleteItemDisplayRowNo] = useState<
    number | null
  >(null);
  // 削除対象アイテム
  const [deleteItem, setDeleteItem] = useState<SeatUsage | null>(null);

  const { seatUsages, isLoading, fetchUsageLogs, updateUsageLogsIsDeleted } =
    useSeatUsageLogsByDate(targetDate);

  // 日付変更時のデータ検索処理
  const onHistoryDateChanged = (date: Date) => {
    setTargetDate(date);
    fetchUsageLogs(date);
  };

  const isItemDeletable = useMemo(
    () => formatDate(targetDate) === formatDate(new Date()),
    [targetDate],
  );

  // 履歴レコードの削除ボタンクリック処理
  const onDeleteHistory = (displayRowNo: number, deleteItem: SeatUsage) => {
    if (isLoading || !displayRowNo || !deleteItem) return;

    setDeleteItemDisplayRowNo(displayRowNo);
    setDeleteItem(deleteItem);
  };

  // 履歴削除処理を実行
  const onAppliedDeleteHistory = async () => {
    if (isLoading || !deleteItem) return;

    await updateUsageLogsIsDeleted(deleteItem?.id, true);
    await fetchUsageLogs(targetDate);

    // キャッシュクリア
    setDeleteItemDisplayRowNo(null);
    setDeleteItem(null);
  };
  // 履歴削除処理をキャンセル
  const onCanceledDeleteHistory = () => {
    setDeleteItemDisplayRowNo(null);
    setDeleteItem(null);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl rounded-lg p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">利用履歴</h1>

        <DateSelectorForm
          systemDate={format(targetDate, "yyyy-MM-dd")}
          onHistoryDateChanged={onHistoryDateChanged}
        />

        <ScoreDisplayForm seatUsages={seatUsages} />

        <HistoryListViewForm
          isItemDeletable={isItemDeletable}
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

        {/* ローディング */}
        {isLoading && (
          <span className="z-index-1000 loading loading-spinner loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        )}
      </div>
    </div>
  );
}
