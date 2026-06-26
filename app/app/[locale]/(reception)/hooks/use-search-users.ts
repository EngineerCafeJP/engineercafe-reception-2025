import humps from "humps";
import { useRef, useState } from "react";
import { fetchLatestSeatUsageByUserId } from "@/[locale]/(reception)/queries/seat-usages-queries";
import { fetchUsersBySearchParams } from "@/[locale]/(reception)/queries/users-queries";
import { SeatUsage, User } from "@/types";

export const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const latestRequestIdRef = useRef(0);

  const isLatestRequest = (requestId: number) =>
    requestId === latestRequestIdRef.current;

  const fetch = async (
    keyword?: string,
    withLatestSeatUsage?: boolean,
    searchType?: string,
  ) => {
    const requestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = requestId;
    setIsLoading(true);
    setError(null);

    const type = searchType || "user_id";
    const id = keyword?.match(/^\d+$/) ? Number(keyword) : undefined;

    const params =
      type === "user_id"
        ? { id: id }
        : {
            name: keyword,
            email: keyword,
            pronunciation: keyword,
            phone: keyword,
          };

    const { data, error } = await fetchUsersBySearchParams(params);

    if (!isLatestRequest(requestId)) {
      return;
    }

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

    if (!isLatestRequest(requestId)) {
      return;
    }

    setUsers(camelizedData);
    setIsLoading(false);
  };

  const clear = () => {
    latestRequestIdRef.current += 1;
    setUsers([]);
    setError(null);
    setIsLoading(false);
  };

  return { users, isLoading, error, fetch, clear };
};
