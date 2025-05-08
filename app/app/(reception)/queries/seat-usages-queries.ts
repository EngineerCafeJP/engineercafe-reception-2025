import { format } from "date-fns";
import client from "@/utils/supabase/client";

export const fetchSeatUsageLogById = async (id: number) => {
  return client.from("seat_usage_logs").select("*").eq("id", id).single();
};

/**
 * 利用履歴一覧情報の取得
 * @param date 検索対象の日付
 * @returns 検索結果
 */
export const fetchSeatUsageLogsByDate = async (date: Date) => {
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
        name
      )`,
    )
    // 当日のみ（＝当日の0時以降 ～ 翌日の0時未満）を抽出対象とする
    .gte("start_time", startTime)
    .lt("start_time", endTime)
    // 未削除 or Null の履歴を対象とする
    .or("is_delete.eq.false,is_delete.is.null")
    // 利用開始日時順
    .order("start_time", { ascending: true });

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

/**
 * 利用履歴の削除
 * @param id 対象の利用履歴ID
 * @param is_delete 削除済みフラグ
 */
export const updateSeatUsageIsDeleted = async (
  id: number,
  is_delete: boolean,
) => {
  return client
    .from("seat_usage_logs")
    .update({ is_delete: is_delete })
    .eq("id", id);
};
