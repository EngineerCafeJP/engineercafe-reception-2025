import humps from "humps";
import { useState } from "react";
import {
  fetchSeatWithCategory,
  updateSeat,
} from "@/[locale]/(reception)/queries/seats-queries";
import { Seat } from "@/types";

export const useUpdateSeat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ユーザーを更新する
  //@param seatId 座席ID
  //@param seatParams 座席パラメータ
  //@returns 更新後の座席データ
  const update = async (
    seatId: number,
    seatParams: {
      outOfService: boolean;
      attentionMessage: string;
    },
  ): Promise<Seat | null> => {
    try {
      setError(null);
      setIsLoading(true);

      const { error } = await updateSeat(seatId, seatParams);
      if (error) {
        setError(error);
        setIsLoading(false);
        return null;
      }

      const { data, error: fetchError } = await fetchSeatWithCategory(seatId);
      if (fetchError) {
        setError(fetchError);
        setIsLoading(false);
        return null;
      }

      return humps.camelizeKeys(data) as Seat;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    update,
    isLoading,
    error,
  };
};
