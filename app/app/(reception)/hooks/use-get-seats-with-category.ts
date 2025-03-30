import humps from "humps";
import { useEffect, useState } from "react";
import { SeatWithCategory } from "@/app/types";
import { getSeatsWithCategory } from "../queries/get-seats";

export const useGetSeatsWithCategory = () => {
  const [seats, setSeats] = useState<SeatWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error } = await getSeatsWithCategory();

      if (error) {
        setError(error);
        return;
      }
      const camelizedData = humps.camelizeKeys(data);
      setSeats(camelizedData as SeatWithCategory[]);
      setIsLoading(false);
    })();
  }, []);

  return { seats, isLoading, error };
};
