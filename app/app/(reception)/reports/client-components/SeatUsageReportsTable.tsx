"use client";

import { FC } from "react";
import { SeatUsageReport } from "@/app/types/seat-usage-report";

interface SeatUsageReportTableProps {
  seatUsageReports: SeatUsageReport[];
  title: string;
}

const SeatUsageReportTable: FC<SeatUsageReportTableProps> = ({
  seatUsageReports,
  title,
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title m-auto">{title}</h2>
        <div className="overflow-x-auto">
          <table className="table text-center">
            <caption className="text-right text-gray-500">
              利用回数 (利用者数)
            </caption>
            <thead>
              <tr>
                <th className="w-32"></th>
                <th>すべて</th>
                <th>国外</th>
                <th>県外</th>
                <th>市外</th>
                <th>市内</th>
              </tr>
            </thead>
            <tbody>
              {seatUsageReports.length === 0 ? (
                <tr>
                  <td colSpan={6}>データがありません</td>
                </tr>
              ) : (
                seatUsageReports.map((report) => (
                  <tr key={report.key}>
                    <th>{report.key}</th>
                    <td>
                      {report.totalUsers} ({report.uniqueUsers})
                    </td>
                    <td>
                      {report.totalOverseasUsers} ({report.uniqueOverseasUsers})
                    </td>
                    <td>
                      {report.totalOutsideFukuokaPrefUsers} (
                      {report.uniqueOutsideFukuokaPrefUsers})
                    </td>
                    <td>
                      {report.totalOutsideFukuokaCityUsers} (
                      {report.uniqueOutsideFukuokaCityUsers})
                    </td>
                    <td>
                      {report.totalFukuokaCityUsers} (
                      {report.uniqueFukuokaCityUsers})
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeatUsageReportTable;
