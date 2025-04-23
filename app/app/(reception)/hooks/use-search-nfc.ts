import camelcaseKeys from "camelcase-keys";
import { useState } from "react";
import { fetchUserIdByNfcId } from "@/app/(reception)/queries/nfcs-queries";
import { Nfc } from "@/app/types";

export const useSearchNfc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<Nfc["userId"] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const search = async (cardId: string) => {
    try {
      setIsLoading(true);
      setUserId(null);
      setSearchError(null);

      const { data, error } = await fetchUserIdByNfcId(cardId);

      if (error) {
        setSearchError(error.message);
        return { data, error: error.message };
      }

      const userId = data ? camelcaseKeys(data).userId : data;
      setUserId(userId);
      return { data: userId, error };
    } catch (e) {
      setSearchError("エラーが発生しました。");
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    data: userId,
    error: searchError,
    search,
  };
};
