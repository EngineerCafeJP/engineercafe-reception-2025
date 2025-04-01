import humps from "humps";
import { useEffect, useState } from "react";
import { getSeatsWithCategory } from "@/app/(reception)/queries/seats";
import { SeatWithCategory } from "@/app/types";

export const useSeatsWithCategory = () => {
  const [seats, setSeats] = useState<SeatWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true);
      const { data, error } = await getSeatsWithCategory();

      if (error) {
        setError(error);
        return;
      }
      const camelizedData = humps.camelizeKeys(data);
      setSeats(camelizedData as SeatWithCategory[]);
      setIsLoading(false);
    };

    fetchSeats();
  }, []);

  return { seats, isLoading, error };
};
