"use client";

//import { redirect } from "next/navigation";
//import { useAuth } from "@/app/contexts/AuthContext";
import { useState } from "react";
import DeleteHistoryItemConfirmModal from "@/app/(reception)/usage-logs/client-components/DeleteHistoryItemConfirmModal";
import DateSelectorForm from "./client-components/DateSelectorForm";
import HistoryListViewForm from "./client-components/HistoryListViewForm";
import PageTitleForm from "./client-components/PageTitleForm";
import ScoreDisplayForm from "./client-components/ScoreDisplayForm";
import HistoryListViewItemEntity from "./entities/HistoryListViewItemEntity";
import HistoryPageEntity from "./entities/HistoryPageEntity";

const historyPageEntity = new HistoryPageEntity();
historyPageEntity.TotalUsagesNum = 123;
historyPageEntity.TotalUsersNum = 111;
historyPageEntity.SelectedDateStr = new Date().toISOString().split("T")[0];

export default function UsageHistory() {
  // TODO: (KUROKI) ログイン状態を判定してリダイレクト。
  // 共通のヘッダー等で行えば、個別画面でやる必要ない？
  /*
  const { session } = useAuth();
  if (session == null) {
    redirect("/");
  }
  */

  // 削除対象アイテム 及び その行番号
  const [deleteHistoryItem, setDeleteHistoryItem] =
    useState<HistoryListViewItemEntity | null>(null);
  const [deleteHistoryItemDisplayRowNo, setDeleteHistoryItemDisplayRowNo] =
    useState<number | null>(null);

  const onHistoryDateChanged = (dateStr: string) => {
    historyPageEntity.SelectedDateStr = dateStr;

    // TODO: (KUROKI) DB検索して資料数・利用者数をリフレッシュ
    //historyPageEntity.TotalUsagesNum += 1;
  };

  /** 履歴レコードの削除ボタンクリック処理 */
  const onDeleteHistory = (
    displayRowNo: number,
    deleteItem: HistoryListViewItemEntity,
  ) => {
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
        systemDate={historyPageEntity.SelectedDateStr}
        onHistoryDateChanged={onHistoryDateChanged}
      />

      <ScoreDisplayForm
        totalUsagesNum={historyPageEntity.TotalUsagesNum}
        totalUsersNum={historyPageEntity.TotalUsersNum}
      />

      <HistoryListViewForm
        listViewItemEntities={historyPageEntity.HistoryListViewItemEntities}
        onDeleteHistory={onDeleteHistory}
      />

      {/* 履歴削除の確認ダイアログ */}
      {deleteHistoryItem && deleteHistoryItemDisplayRowNo && (
        <DeleteHistoryItemConfirmModal
          displayRowNo={deleteHistoryItemDisplayRowNo}
          historyListViewItemEntity={deleteHistoryItem}
          isOpen={
            Boolean(deleteHistoryItem) && Boolean(deleteHistoryItemDisplayRowNo)
          }
          onApplied={onAppliedDeleteHistory}
          onCanceled={onCanceledDeleteHistory}
        />
      )}
    </div>
  );
}
