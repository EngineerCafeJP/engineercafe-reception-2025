import camelcaseKeys from "camelcase-keys";
import { useState } from "react";
import { fetchUserIdByNfcId } from "@/app/[locale]/(reception)/queries/nfcs-queries";
import { Nfc } from "@/app/types";

export const useSearchNfc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<Nfc["userId"] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const search = async (cardId: string) => {
    try {
      setIsLoading(true);
      setUserId(null);

      const { data, error } = await fetchUserIdByNfcId(cardId);

      if (error) {
        setSearchError(error.message);
        setUserId(data);
        return data;
      }

      if (!data) {
        setSearchError(
          `このカード (ID: ${cardId}) を登録しているユーザーは存在しません。`,
        );
        setUserId(data);
        return data;
      }

      const { userId } = camelcaseKeys(data);
      setSearchError(null);
      setUserId(userId);
      return userId;
    } catch {
      setSearchError("エラーが発生しました。");
      setUserId(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setSearchError(null);
  };

  return {
    isLoading,
    data: userId,
    error: searchError,
    search,
    clearError,
  };
};
