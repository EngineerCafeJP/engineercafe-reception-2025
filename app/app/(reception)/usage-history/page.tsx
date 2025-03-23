"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import DateSelectorForm from "./client-components/DateSelectorForm";
import HistoryListViewForm from "./client-components/HistoryListViewForm";
import PageTitleForm from "./client-components/PageTitleForm";
import ScoreDisplayForm from "./client-components/ScoreDisplayForm";
import HistoryPageEntity from "./entities/HistoryPageEntity";

export default function UsageHistory() {
  const { session, signIn } = useAuth();

  if (session) {
    redirect("/");
  }

  const historyPageEntity = new HistoryPageEntity();
  historyPageEntity.ScoreOfUsages = 123;
  historyPageEntity.ScoreOfUsers = 987;
  historyPageEntity.SelectedDateStr = new Date().toISOString().split("T")[0];

  const onHistoryDateChanged = (dateStr: string) => {
    historyPageEntity.SelectedDateStr = dateStr;
    historyPageEntity.ScoreOfUsages += 1;
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
      />
    </div>
  );
}
