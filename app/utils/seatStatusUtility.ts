/**
 * ステータス名の取得
 * @param startTime 利用開始日時
 * @param endTime 利用終了日時
 * @returns ステータス名
 */
const getUsageStatus = (startTime: string, endTime: string): string => {
  if (!startTime && !endTime) {
    return "";
  } else if (startTime && endTime) {
    return "退席済み";
  } else if (startTime && !endTime) {
    return "利用中";
  }

  // あり得ないケース
  return "";
};

export { getUsageStatus };
