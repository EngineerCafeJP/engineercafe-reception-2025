"use client";

import React, { useState } from "react";
import {
  useSeatUsageDailyReports,
  useSeatUsageMonthlyReports,
  useSeatUsageYearlyReports,
} from "@/[locale]/(reception)/hooks/use-seat-usage-reports-view";
import DateSelectForm from "@/[locale]/(reception)/reports/client-components/DateSelectForm";
import SeatUsageReportTable from "@/[locale]/(reception)/reports/client-components/SeatUsageReportsTable";
import { useSession } from "@/hooks/use-session";
import {
  formatEndDateOfMonth,
  formatStartDateOfMonth,
  formatYear,
  formatYearMonth,
} from "@/utils/format-date";

export default function ReportsPage() {
  useSession(true);

  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const {
    data: seatUsageYearlyReports,
    isLoading: isLoadingYearlyReport,
    error: errorYearlyReport,
  } = useSeatUsageYearlyReports(formatYear(new Date(date)));

  const {
    data: seatUsageMonthlyReports,
    isLoading: isLoadingMonthlyReport,
    error: errorMonthlyReport,
  } = useSeatUsageMonthlyReports(formatYearMonth(new Date(date)));

  const {
    data: seatUsageDailyReports,
    isLoading: isLoadingDailyReports,
    error: errorDailyReports,
  } = useSeatUsageDailyReports(
    formatStartDateOfMonth(new Date(date)),
    formatEndDateOfMonth(new Date(date)),
  );

  if (
    isLoadingDailyReports ||
    isLoadingMonthlyReport ||
    isLoadingYearlyReport
  ) {
    return <div>Loading...</div>;
  }

  if (errorDailyReports || errorMonthlyReport || errorYearlyReport) {
    return (
      <div>
        Error:{" "}
        {errorDailyReports?.message ||
          errorMonthlyReport?.message ||
          errorYearlyReport?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-[1rem] max-w-screen-lg p-4">
      <h1 className="mb-6 text-3xl font-bold">レポート</h1>
      <DateSelectForm selectedDate={date} onChange={(date) => setDate(date)} />

      <SeatUsageReportTable
        seatUsageReports={seatUsageYearlyReports}
        title="年度集計"
      />

      <SeatUsageReportTable
        seatUsageReports={seatUsageMonthlyReports}
        title="月次集計"
      />

      <SeatUsageReportTable
        seatUsageReports={seatUsageDailyReports}
        title="日次集計"
      />
    </div>
  );
}
