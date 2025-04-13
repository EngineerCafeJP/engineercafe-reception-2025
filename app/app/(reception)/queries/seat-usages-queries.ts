import { format } from "date-fns";
import client from "@/utils/supabase/client";

export const fetchSeatUsageLogById = async (id: number) => {
  return client.from("seat_usage_logs").select("*").eq("id", id).single();
};

export const fetchSeatUsageLogsByStartTime = async (
  isDelete: boolean,
  date: Date,
) => {
  const startTime = format(new Date(date), "yyyy-MM-dd");
  const endTime = format(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
    "yyyy-MM-dd",
  );

  const query = client
    .from("seat_usage_logs")
    .select(
      `
      id,
      seat_id,
      user_id,
      start_time,
      end_time,
      users (
        id,
        name
      ),
      seats (
        id,
        name,
        category_id,
        seat_categories (
          id,
          name
        )
      )
    `,
    )
    // 当日のみ（＝当日の0時以降 ～ 翌日の0時未満）を抽出対象とする
    .gte("start_time", startTime)
    .lt("start_time", endTime)
    // 未削除の履歴のみを対象とする
    .eq("is_delete", isDelete);

  return await query;
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
