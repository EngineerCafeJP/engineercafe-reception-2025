import humps from "humps";
import { useEffect, useState } from "react";
import {
  fetchSeatUsageLogById,
  fetchSeatUsageLogsByStartTime,
  updateSeatUsageIsDeleted,
} from "@/app/(reception)/queries/seat-usages-queries";
import { SeatUsage } from "@/app/types";

export const useInUsageLogs = (targetDate: Date) => {
  const [seatUsages, setSeatUsages] = useState<SeatUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUsageLogs(false, targetDate);
  }, []);

  /** 利用履歴一覧情報の取得 */
  const fetchUsageLogs = async (isDeleted: boolean, date?: Date) => {
    setIsLoading(true);

    const { data, error } = await fetchSeatUsageLogsByStartTime(
      isDeleted,
      date!,
    );

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

  /** 利用履歴の削除 */
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
