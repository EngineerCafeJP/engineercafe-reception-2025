import humps from "humps";
import { useEffect, useState } from "react";
import { SeatUsage } from "@/app/types";
import { getInUseSeatUsageLogs } from "../queries/get-seat-usages";

export const useGetInUseSeatUsages = () => {
  const [seatUsages, setSeatUsages] = useState<SeatUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error } = await getInUseSeatUsageLogs();
      debugger;
      if (error) {
        setError(error);
        return;
      }
      const camelizedData = humps.camelizeKeys(data);
      setSeatUsages(camelizedData as SeatUsage[]);
      setIsLoading(false);
    })();
  }, []);

  return { seatUsages, isLoading, error };
};
