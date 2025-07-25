import { SeatUsage } from "@/types";

/**
 * ステータス名の取得
 * @param seatUsage 利用履歴
 * @returns ステータス名
 */
const getUsageStatus = (seatUsage: SeatUsage): string => {
  // 開始日時は必須項目のため、未設定の場合はエラーとする。
  if (!seatUsage.startTime)
    throw new Error("利用開始日時が設定されていません。");

  return !seatUsage.endTime ? "利用中" : "退席済み";
};

export { getUsageStatus };
