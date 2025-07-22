import humps from "humps";
import { useState } from "react";
import { fetchUsersBySearchParams } from "@/[locale]/(reception)/queries/users-queries";
import { User } from "@/types";

export const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async (keyword?: string) => {
    setIsLoading(true);
    // 数値のみの場合はidとして扱う
    const id = keyword?.match(/^\d+$/) ? Number(keyword) : undefined;

    const params = id
      ? { id }
      : { name: keyword, email: keyword, phone: keyword };

    const { data, error } = await fetchUsersBySearchParams(params);

    if (error) {
      setError(error);
      setIsLoading(false);
      setUsers([]);
      return;
    }

    if (data == null || data.length === 0) {
      setUsers([]);
      setIsLoading(false);
      return;
    }

    const camelizedData = humps.camelizeKeys(data);
    setUsers(camelizedData as User[]);
    setIsLoading(false);
  };

  const clear = () => {
    setUsers([]);
    setError(null);
    setIsLoading(false);
  };

  return { users, isLoading, error, fetch, clear };
};
