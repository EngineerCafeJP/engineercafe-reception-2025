import humps from "humps";
import { useEffect, useState } from "react";
import { fetchInUseSeatUsageLogs } from "@/[locale]/(reception)/queries/seat-usages-queries";
import { SeatUsage } from "@/types";

export const useInUseSeatUsages = () => {
  const [seatUsages, setSeatUsages] = useState<SeatUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setIsLoading(true);
    const { data, error } = await fetchInUseSeatUsageLogs();

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    const camelizedData = humps.camelizeKeys(data);
    setSeatUsages(camelizedData as SeatUsage[]);
    setIsLoading(false);
  };

  return { seatUsages, isLoading, error, fetch };
};
