import { SeatUsage } from "@/types";

// 利用間隔を表示するラベル
// 間隔が1年以上の場合は、◯年◯ヶ月と表示する
// 間隔が1ヶ月以上の場合は、◯ヶ月と表示する
// 間隔が1ヶ月未満の場合は、◯日と表示する
// 間隔が1日未満の場合は、非表示とする
const UsageIntervalLabel = ({ seatUsage }: { seatUsage: SeatUsage }) => {
  const usageIntervalDays = seatUsage.startTime
    ? Math.floor(
        (new Date().getTime() - new Date(seatUsage.startTime).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;
  const usageIntervalMonths = seatUsage.startTime
    ? Math.floor(
        (new Date().getTime() - new Date(seatUsage.startTime).getTime()) /
          (1000 * 60 * 60 * 24 * 30),
      )
    : 0;
  const usageIntervalYears = seatUsage.startTime
    ? Math.floor(
        (new Date().getTime() - new Date(seatUsage.startTime).getTime()) /
          (1000 * 60 * 60 * 24 * 365),
      )
    : 0;
  const usageIntervalLabel =
    usageIntervalYears > 0
      ? `${usageIntervalYears}年${usageIntervalMonths}ヶ月`
      : usageIntervalMonths > 0
        ? `${usageIntervalMonths}ヶ月`
        : usageIntervalDays > 0
          ? `${usageIntervalDays}日`
          : "";

  return <div>({usageIntervalLabel}前)</div>;
};

export default UsageIntervalLabel;
