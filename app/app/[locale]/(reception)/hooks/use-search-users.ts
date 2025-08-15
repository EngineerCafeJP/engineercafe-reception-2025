import humps from "humps";
import { useState } from "react";
import { fetchLatestSeatUsageByUserId } from "@/[locale]/(reception)/queries/seat-usages-queries";
import { fetchUsersBySearchParams } from "@/[locale]/(reception)/queries/users-queries";
import { SeatUsage, User } from "@/types";

export const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async (keyword?: string, withLatestSeatUsage?: boolean) => {
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

    let camelizedData = humps.camelizeKeys(data) as User[];

    if (withLatestSeatUsage) {
      camelizedData = await Promise.all(
        camelizedData.map(async (user) => {
          const { data: latestSeatUsageData, error: latestSeatUsageError } =
            await fetchLatestSeatUsageByUserId(user.id);
          if (latestSeatUsageError) {
            return user;
          }
          user.latestSeatUsage = humps.camelizeKeys(
            latestSeatUsageData,
          ) as SeatUsage;
          return user;
        }),
      );
    }

    setUsers(camelizedData);
    setIsLoading(false);
  };

  const clear = () => {
    setUsers([]);
    setError(null);
    setIsLoading(false);
  };

  return { users, isLoading, error, fetch, clear };
};
