import { SeatUsage } from "@/types";

// 利用間隔を表示するラベル
// 間隔が1年以上の場合は、◯年◯ヶ月と表示する
// 間隔が1ヶ月以上の場合は、◯ヶ月と表示する
// 間隔が1ヶ月未満の場合は、◯日と表示する
// 間隔が1日未満の場合は、非表示とする
const UsageIntervalLabel = ({ seatUsage }: { seatUsage: SeatUsage }) => {
  if (!seatUsage.startTime) {
    return null;
  }

  const startDate = new Date(seatUsage.startTime);
  const currentDate = new Date();

  // 日数の差分を計算
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 1) {
    return null;
  }

  // 正確な年月日の計算
  const calculateInterval = (start: Date, end: Date) => {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // 日が負の場合は前月から借りる
    if (days < 0) {
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    // 月が負の場合は前年から借りる
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days };
  };

  const interval = calculateInterval(startDate, currentDate);

  // 表示ロジック
  if (interval.years > 0) {
    if (interval.months > 0) {
      return (
        <div>
          ({interval.years}年{interval.months}ヶ月前)
        </div>
      );
    } else {
      return <div>({interval.years}年前)</div>;
    }
  } else if (interval.months > 0) {
    return <div>({interval.months}ヶ月前)</div>;
  } else {
    return <div>({interval.days}日前)</div>;
  }
};

export default UsageIntervalLabel;
