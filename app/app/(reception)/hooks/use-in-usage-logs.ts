import humps from "humps";
import { useEffect, useState } from "react";
import {
  fetchSeatUsageLogById,
  fetchSeatUsageLogsByStartTime,
  updateSeatUsageIsDeleted,
} from "@/app/(reception)/queries/seat-usages-queries";
import { SeatUsage } from "@/app/types";

export const useInUsageLogs = (targetDate: Date) => {
  //const [targetDate, setTargetDate] = useState("");
  const [seatUsages, setSeatUsages] = useState<SeatUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!targetDate || targetDate.toString() == new Date("X").toString()) {
      setSeatUsages([]);
      setError(error);
      setIsLoading(false);
    }
  });

  const fetchUsageLogs = async (isDeleted: boolean, date?: Date) => {
    setIsLoading(true);

    const { data, error } = await fetchSeatUsageLogsByStartTime(
      isDeleted,
      date!,
    );

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    const camelizedData = humps.camelizeKeys(data);
    setSeatUsages(camelizedData as SeatUsage[]);
    setIsLoading(false);
  };

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
    setIsLoading(false);

    return humps.camelizeKeys(data);
  };

  return {
    targetDate,
    seatUsages,
    isLoading,
    error,
    fetchUsageLogs,
    updateUsageLogsIsDeleted,
  };
};
