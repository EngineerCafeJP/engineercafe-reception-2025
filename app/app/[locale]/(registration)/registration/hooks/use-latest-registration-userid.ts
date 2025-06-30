import { useQuery } from "@tanstack/react-query";
import supabase from "@/utils/supabase/client";

export function useLatestRegistrationUserId() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["latest-registration-user-id"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("latest_registration_user_view")
        .select("id")
        .single();

      if (error) {
        throw error;
      }

      return data?.id;
    },
  });

  return {
    latestUserId: data,
    isLoading,
    isError,
    refetch,
  };
}
