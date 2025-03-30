import client from "@/utils/supabase/client";

export const getInUseSeatUsageLogs = async () => {
  return client
    .from("seat_usage_logs")
    .select("*")
    .filter("end_time", "is", null);
};
