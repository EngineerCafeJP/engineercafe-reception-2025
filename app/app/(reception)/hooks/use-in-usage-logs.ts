import humps from "humps";
import { useEffect, useState } from "react";
import {
  fetchSeatUsageLogById,
  fetchSeatUsageLogsByDate,
  updateSeatUsageIsDeleted,
} from "@/app/(reception)/queries/seat-usages-queries";
import { SeatUsage } from "@/app/types";

export const useSeatUsageLogsByDate = (targetDate: Date) => {
  const [seatUsages, setSeatUsages] = useState<SeatUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUsageLogs(false, targetDate);
  }, [targetDate]);

  /**
   * 利用履歴一覧情報の取得
   * @param isDelete 削除済み/未削除 のどちらを検索対象とするか
   * @param date 検索対象の日付
   * @returns 検索結果
   */
  const fetchUsageLogs = async (isDeleted: boolean, date: Date) => {
    setIsLoading(true);

    const { data, error } = await fetchSeatUsageLogsByDate(isDeleted, date);

    if (error) {
      setSeatUsages([]);
      setError(error);
      setIsLoading(false);
      return;
    }

    const camelizedData = humps.camelizeKeys(data) as SeatUsage[];
    setSeatUsages(camelizedData);
    setError(null);
    setIsLoading(false);
  };

  /**
   * 利用履歴の削除
   * @param id 対象の利用履歴ID
   * @param is_delete 削除済みフラグ
   */
  const updateUsageLogsIsDeleted = async (id: number, isDeleted: boolean) => {
    const { error: seatUsageError } = await fetchSeatUsageLogById(id);
    if (seatUsageError) {
      setError(seatUsageError);
      setIsLoading(false);
      return;
    }

    const { data, error } = await updateSeatUsageIsDeleted(id, isDeleted);
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    setError(null);
    setIsLoading(false);

    return humps.camelizeKeys(data);
  };

  return {
    seatUsages,
    isLoading,
    error,
    fetchUsageLogs,
    updateUsageLogsIsDeleted,
  };
};
