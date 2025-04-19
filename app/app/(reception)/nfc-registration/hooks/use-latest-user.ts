import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import camelcaseKeys from "camelcase-keys";
import { fetchLatestUserId } from "@/app/(reception)/queries/users-queries";

export function useLatestUser() {
  const { isLoading, isError, error, data } = useQuery(fetchLatestUserId());

  return {
    isLoading,
    isError,
    error,
    data: data ? camelcaseKeys(data) : null,
  };
}
