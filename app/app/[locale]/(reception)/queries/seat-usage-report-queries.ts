import client from "@/app/utils/supabase/client";

export const fetchSeatUsageDailyReports = async (
  startDate: string,
  endDate: string,
) => {
  return client
    .from("seat_usage_daily_reports_view")
    .select("*, key:date")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });
};

export const fetchSeatUsageMonthlyReports = async (month?: string) => {
  // 月が指定されている場合は、その月のデータを取得
  // 月が指定されていない場合は、全てのデータを取得
  if (month != null) {
    return client
      .from("seat_usage_monthly_reports_view")
      .select("*, key:month")
      .eq("month", month)
      .order("month", { ascending: true });
  }

  return client
    .from("seat_usage_monthly_reports_view")
    .select("*, key:month")
    .order("month", { ascending: true });
};

export const fetchSeatUsageYearlyReports = async (year?: string) => {
  // 年が指定されている場合は、その年のデータを取得
  // 年が指定されていない場合は、全てのデータを取得
  if (year != null) {
    return client
      .from("seat_usage_yearly_reports_view")
      .select("*, key:year")
      .eq("year", year)
      .order("year", { ascending: true });
  }
  return client
    .from("seat_usage_yearly_reports_view")
    .select("*, key:year")
    .order("year", { ascending: true });
};
