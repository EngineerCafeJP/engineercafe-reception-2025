import client from "@/utils/supabase/client";

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

export const fetchSeatUsageMonthlyReport = async (month: string) => {
  return client
    .from("seat_usage_monthly_reports_view")
    .select("*, key:month")
    .eq("month", month)
    .order("month", { ascending: true })
    .single();
};

export const fetchSeatUsageYearlyReport = async (year: string) => {
  return client
    .from("seat_usage_yearly_reports_view")
    .select("*, key:year")
    .eq("year", year)
    .order("year", { ascending: true })
    .single();
};
