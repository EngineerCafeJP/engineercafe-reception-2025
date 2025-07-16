import { useState } from "react";
import { softDeleteUser as deleteUserQuery } from "@/[locale]/(reception)/queries/users-queries";

export const useSoftDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ユーザーを更新する
  //@param userId ユーザーID
  //@returns 更新後のユーザーデータ
  const softDeleteUser = async (userId: number): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      const { error } = await deleteUserQuery(userId);
      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setError(error as Error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    softDeleteUser,
    isLoading,
    error,
  };
};
