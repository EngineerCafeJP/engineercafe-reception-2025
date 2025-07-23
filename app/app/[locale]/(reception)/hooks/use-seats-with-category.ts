import humps from "humps";
import { useEffect, useState } from "react";
import { getSeatsWithCategory } from "@/[locale]/(reception)/queries/seats-queries";
import { SeatWithCategory } from "@/types";

export const useSeatsWithCategory = () => {
  const [seats, setSeats] = useState<SeatWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    setIsLoading(true);
    const { data, error } = await getSeatsWithCategory();

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    const camelizedData = humps.camelizeKeys(data);
    setSeats(camelizedData as SeatWithCategory[]);
    setIsLoading(false);
  };

  return { seats, isLoading, error, refetch: fetchSeats };
};
