import humps from "humps";
import { useState } from "react";
import {
  updateUser,
  fetchUser,
} from "@/app/[locale]/(reception)/queries/users-queries";
import { User } from "@/app/types";

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ユーザーを更新する
  //@param userId ユーザーID
  //@returns 更新後のユーザーデータ
  const update = async (
    userId: number,
    user: Partial<User>,
  ): Promise<User | null> => {
    try {
      setError(null);
      setIsLoading(true);

      const { error } = await updateUser(userId, user);
      if (error) {
        setError(error);
        setIsLoading(false);
        return null;
      }

      const { data, error: fetchError } = await fetchUser(userId);
      if (fetchError) {
        setError(fetchError);
        setIsLoading(false);
        return null;
      }

      return humps.camelizeKeys(data) as User;
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
