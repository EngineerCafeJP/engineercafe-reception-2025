import client from "@/utils/supabase/client";

export const fetchSeatUsageLogById = async (id: number) => {
  return client.from("seat_usage_logs").select("*").eq("id", id).single();
};

export const fetchInUseSeatUsageLogsBySeatId = async (seatId: number) => {
  // seat_usage_logsの中で、seat_idがseatIdで、end_timeがnullのデータを取得する

  return client
    .from("seat_usage_logs")
    .select("*")
    .eq("seat_id", seatId)
    .is("end_time", null)
    .single();
};

export const fetchInUseSeatUsageLogs = async () => {
  return client
    .from("seat_usage_logs")
    .select("*")
    .filter("end_time", "is", null);
};

export const createSeatUsage = async (
  seatId: number,
  userId: number,
  startTime?: string,
) => {
  return client.from("seat_usage_logs").insert({
    seat_id: seatId,
    user_id: userId,
    start_time: startTime ?? new Date().toISOString(),
    created_at: new Date().toISOString(),
  });
};

export const updateSeatUsageEndtime = async (id: number, endTime: string) => {
  return client
    .from("seat_usage_logs")
    .update({ end_time: endTime })
    .eq("id", id);
};
