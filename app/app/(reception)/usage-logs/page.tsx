"use client";

import { format } from "date-fns";
import { useState } from "react";
import DeleteHistoryItemConfirmModal from "@/app/(reception)/usage-logs/client-components/DeleteHistoryItemConfirmModal";
import { SeatUsage } from "@/app/types";
import DateSelectorForm from "./client-components/DateSelectorForm";
import HistoryListViewForm from "./client-components/HistoryListViewForm";
import PageTitleForm from "./client-components/PageTitleForm";
import ScoreDisplayForm from "./client-components/ScoreDisplayForm";

export default function UsageHistory() {
  // TODO: (KUROKI) ログイン状態を判定してリダイレクト。
  // 共通のヘッダー等で行えば、個別画面でやる必要ない？
  /*
  const { session } = useAuth();
  if (session == null) {
    redirect("/");
  }
  */

  // 履歴の標示対象日付
  const [targetDate, setTargetDate] = useState(new Date());
  //const [seatUsages, setSeatUsages] = useState<SeatUsage[]>([]);

  // 利用数・利用者数
  const [totalUsagesNum, setTotalUsagesNum] = useState(222);
  const [totalUsersNum, setTotalUsersNum] = useState(111);

  // 削除対象アイテム 及び その行番号
  const [deleteHistoryItemDisplayRowNo, setDeleteHistoryItemDisplayRowNo] =
    useState<number | null>(null);
  const [deleteHistoryItem, setDeleteHistoryItem] = useState<SeatUsage | null>(
    null,
  );

  const onHistoryDateChanged = (date: Date) => {
    setTargetDate(date);
  };

  /** 履歴リフレッシュ時処理 */
  const onHistoryRefreshed = (logs: SeatUsage[]) => {
    // 利用数
    setTotalUsagesNum(logs.length);
    // 利用者数
    const distinctIds = new Set(logs.map((item) => item.users.id));
    setTotalUsersNum(distinctIds.size);
    //setSeatUsages(logs);
  };

  /** 履歴レコードの削除ボタンクリック処理 */
  const onDeleteHistory = (displayRowNo: number, deleteItem: SeatUsage) => {
    if (!displayRowNo || !deleteItem) return;

    setDeleteHistoryItemDisplayRowNo(displayRowNo);
    setDeleteHistoryItem(deleteItem);
  };

  /** 履歴削除処理を実行 */
  const onAppliedDeleteHistory = () => {
    alert("TODO: DB更新処理を実行！！");

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

      <ScoreDisplayForm
        totalUsagesNum={totalUsagesNum}
        totalUsersNum={totalUsersNum}
      />

      <HistoryListViewForm
        targetDate={targetDate}
        onDeleteHistory={onDeleteHistory}
        onHistoryRefreshed={onHistoryRefreshed}
      />

      {/* 履歴削除の確認ダイアログ */}
      {deleteHistoryItem && deleteHistoryItemDisplayRowNo && (
        <DeleteHistoryItemConfirmModal
          displayRowNo={deleteHistoryItemDisplayRowNo}
          isOpen={
            Boolean(deleteHistoryItem) && Boolean(deleteHistoryItemDisplayRowNo)
          }
          seatUsage={deleteHistoryItem}
          onApplied={onAppliedDeleteHistory}
          onCanceled={onCanceledDeleteHistory}
        />
      )}
    </div>
  );
}
