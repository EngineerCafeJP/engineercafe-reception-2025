"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import DateSelectorForm from "./client-components/DateSelectorForm";
import HistoryListViewForm from "./client-components/HistoryListViewForm";
import PageTitleForm from "./client-components/PageTitleForm";
import ScoreDisplayForm from "./client-components/ScoreDisplayForm";
import HistoryListViewItemEntity from "./entities/HistoryListViewItemEntity";
import HistoryPageEntity from "./entities/HistoryPageEntity";

const historyPageEntity = new HistoryPageEntity();
historyPageEntity.ScoreOfUsages = 123;
historyPageEntity.ScoreOfUsers = 987;
historyPageEntity.SelectedDateStr = new Date().toISOString().split("T")[0];

export default function UsageHistory() {
  const { session, signIn } = useAuth();

  if (session) {
    redirect("/");
  }

  const [
    isOpenConfirmDeleteHistoryDialog,
    setIsOpenConfirmDeleteHistoryDialog,
  ] = useState(false);
  const [deleteHistoryConfirmMessage, setDeleteHistoryDialogConfirmMessage] =
    useState(<></>);

  const onHistoryDateChanged = (dateStr: string) => {
    historyPageEntity.SelectedDateStr = dateStr;
    historyPageEntity.ScoreOfUsages += 1;
  };

  /** 履歴レコードの削除ボタンクリック処理 */
  const onDeleteHistory = (
    rowNo: number,
    deleteItem: HistoryListViewItemEntity,
  ) => {
    setDeleteHistoryDialogConfirmMessage(
      <>
        <div>利用履歴を削除しますか？</div>
        <div>行番号：{rowNo}</div>
        <div className="m-4 border-1 border-gray-300 p-2">
          <div>
            {deleteItem.AreaName}　{deleteItem.SeatName}
          </div>
          <div>
            {deleteItem.MembershipNumber}　{deleteItem.UserName}
          </div>
          <div>{deleteItem.Status}</div>
        </div>
      </>,
    );

    setIsOpenConfirmDeleteHistoryDialog(true);
  };

  /** 履歴削除処理を実行 */
  const onAppliedDeleteHistory = () => {
    alert("TODO: DB更新処理を実行！！");
    setIsOpenConfirmDeleteHistoryDialog(false);
  };

  /** 履歴削除処理をキャンセル */
  const onCanceledDeleteHistory = () => {
    setIsOpenConfirmDeleteHistoryDialog(false);
  };

  return (
    <div className="container mx-auto mt-[1rem] max-w-[810px] p-4">
      <PageTitleForm />

      <DateSelectorForm
        systemDate={historyPageEntity.SelectedDateStr}
        onHistoryDateChanged={onHistoryDateChanged}
      />

      <ScoreDisplayForm
        socoreOfUsages={historyPageEntity.ScoreOfUsages}
        socoreOfUsers={historyPageEntity.ScoreOfUsers}
      />

      <HistoryListViewForm
        listViewItemEntities={historyPageEntity.HistoryListViewItemEntities}
        onDeleteHistory={onDeleteHistory}
      />

      {/* 履歴削除の確認ダイアログ */}
      <ConfirmDialog
        isOpen={isOpenConfirmDeleteHistoryDialog}
        messageContext={deleteHistoryConfirmMessage}
        title="履歴削除の確認"
        onApplied={onAppliedDeleteHistory}
        onCanceled={onCanceledDeleteHistory}
      />
    </div>
  );
}
