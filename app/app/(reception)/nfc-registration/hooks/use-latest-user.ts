import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import camelcaseKeys from "camelcase-keys";
import { fetchLatestRegisteredUserId } from "@/app/(reception)/queries/users-queries";

export function useLatestRegisteredUser() {
  const { isLoading, isError, error, data } = useQuery(
    fetchLatestRegisteredUserId(),
  );

  return {
    isLoading,
    isError,
    error,
    data: data ? camelcaseKeys(data) : null,
  };
}
