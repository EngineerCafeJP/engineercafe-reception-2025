import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import supabase from "@/utils/supabase/client";

export function useLatestRegistrationUserId() {
  const { data, isLoading, isError, refetch } = useQuery(
    supabase.from("latest_registration_user_view").select("id").single(),
  );

  return {
    latestUserId: data?.id,
    isLoading,
    isError,
    refetch: async () => {
      const { data } = await refetch();
      return { data: data?.data?.id };
    },
  };
}
