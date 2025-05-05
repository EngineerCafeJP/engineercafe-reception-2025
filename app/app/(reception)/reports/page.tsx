"use client";

import React, { useState } from "react";
import {
  useSeatUsageDailyReports,
  useSeatUsageMonthlyReport,
  useSeatUsageYearlyReport,
} from "@/app/(reception)/hooks/use-seat-usage-reports-view";
import DateSelectForm from "@/app/(reception)/reports/client-components/DateSelectForm";
import SeatUsageReportTable from "@/app/(reception)/reports/client-components/SeatUsageReportsTable";
import {
  formatEndDateOfMonth,
  formatStartDateOfMonth,
  formatYear,
  formatYearMonth,
} from "@/utils/formatDate";

export default function ReportsPage() {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const {
    data: seatUsageYearlyReport,
    isLoading: isLoadingYearlyReport,
    error: errorYearlyReport,
  } = useSeatUsageYearlyReport(formatYear(new Date(date)));

  const {
    data: seatUsageMonthlyReport,
    isLoading: isLoadingMonthlyReport,
    error: errorMonthlyReport,
  } = useSeatUsageMonthlyReport(formatYearMonth(new Date(date)));

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
        seatUsageReports={seatUsageYearlyReport ? [seatUsageYearlyReport] : []}
        title="年度集計"
      />

      <SeatUsageReportTable
        seatUsageReports={
          seatUsageMonthlyReport ? [seatUsageMonthlyReport] : []
        }
        title="月次集計"
      />

      <SeatUsageReportTable
        seatUsageReports={seatUsageDailyReports}
        title="日次集計"
      />
    </div>
  );
}
