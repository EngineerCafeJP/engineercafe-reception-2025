import humps from "humps";
import { useState } from "react";
import {
  createSeatUsage,
  fetchInUseSeatUsageLogsBySeatId,
  fetchSeatUsageLogById,
  updateSeatUsageEndtime,
} from "@/[locale]/(reception)/queries/seat-usages-queries";
import { SeatUsage } from "@/types";

export const useSeatUsage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 座席使用を作成する
  //@param seatId 座席ID
  //@param userId ユーザーID
  //@returns 更新後の座席使用データ
  const create = async (seatId: number, userId: number, startTime?: string) => {
    setIsLoading(true);

    // validate duplicate
    const { data: seatUsageData } =
      await fetchInUseSeatUsageLogsBySeatId(seatId);
    if (seatUsageData) {
      setError(new Error("座席が使用中です"));
      setIsLoading(false);
      return;
    }

    const { data, error } = await createSeatUsage(seatId, userId, startTime);
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    return humps.camelizeKeys(data);
  };

  // 座席使用終了時間を更新する
  //@param seatUsage 座席使用
  //@returns 更新後の座席使用データ
  const extendSeatUsage = async (seatUsage: SeatUsage) => {
    setIsLoading(true);
    const { error: seatUsageError } = await fetchSeatUsageLogById(seatUsage.id);
    if (seatUsageError) {
      setError(seatUsageError);
      setIsLoading(false);
      return;
    }

    const { error: updateSeatUsageEndtimeError } = await updateSeatUsageEndtime(
      seatUsage.id,
      new Date().toISOString(),
    );
    if (updateSeatUsageEndtimeError) {
      setError(updateSeatUsageEndtimeError);
      setIsLoading(false);
      return;
    }
    const { data: nextSeatUsageData, error: createNextSeatUsageError } =
      await createSeatUsage(
        seatUsage.seatId,
        seatUsage.userId,
        new Date(seatUsage.startTime).toISOString(),
      );
    if (createNextSeatUsageError) {
      setError(createNextSeatUsageError);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    return humps.camelizeKeys(nextSeatUsageData);
  };

  // 座席使用終了時間を更新する
  //@param seatUsage 座席使用
  //@returns 更新後の座席使用データ
  const finishSeatUsage = async (seatUsage: SeatUsage) => {
    setIsLoading(true);
    const { error: seatUsageError } = await fetchSeatUsageLogById(seatUsage.id);
    if (seatUsageError) {
      setError(seatUsageError);
      setIsLoading(false);
      return;
    }

    const { data, error } = await updateSeatUsageEndtime(
      seatUsage.id,
      new Date().toISOString(),
    );
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    return humps.camelizeKeys(data);
  };

  // 座席使用を移動する
  //@param prevSeatUsage 前の座席使用
  //@param nextSeatUsage 次の座席使用
  //@returns 移動後の座席使用データ
  const moveSeat = async (
    prevSeatUsage: SeatUsage,
    nextSeatUsage: SeatUsage,
  ) => {
    setIsLoading(true);
    const { error: prevSeatUsageError } = await fetchSeatUsageLogById(
      prevSeatUsage.id,
    );
    if (prevSeatUsageError) {
      setError(prevSeatUsageError);
      setIsLoading(false);
      return;
    }

    const { error: finishPrevSeatUsageError } = await updateSeatUsageEndtime(
      prevSeatUsage.id,
      new Date().toISOString(),
    );
    if (finishPrevSeatUsageError) {
      setError(finishPrevSeatUsageError);
      setIsLoading(false);
      return;
    }

    const { data: nextSeatUsageData, error: createNextSeatUsageError } =
      await createSeatUsage(nextSeatUsage.seatId, nextSeatUsage.userId);
    if (createNextSeatUsageError) {
      setError(createNextSeatUsageError);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    return humps.camelizeKeys(nextSeatUsageData);
  };

  return {
    create,
    extendSeatUsage,
    finishSeatUsage,
    moveSeat,
    isLoading,
    error,
  };
};
