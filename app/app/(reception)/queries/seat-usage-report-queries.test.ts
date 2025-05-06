import {
  fetchSeatUsageDailyReports,
  fetchSeatUsageMonthlyReports,
  fetchSeatUsageYearlyReports,
} from "@/app/(reception)/queries/seat-usage-report-queries";
import supabase from "@/utils/supabase/client";

jest.mock("@/utils/supabase/client");

describe("fetchSeatUsageDailyReports", () => {
  const mockSeatUsageDailyReportsData = {
    date: "2025-03-14",
    total_users: 1,
    unique_users: 1,
    total_overseas_users: 1,
    unique_overseas_users: 1,
    total_outside_fukuoka_pref_users: 1,
    unique_outside_fukuoka_pref_users: 1,
    total_fukuoka_pref_users: 1,
    unique_fukuoka_pref_users: 1,
    total_outside_fukuokaCityUsers: 1,
    unique_outside_fukuokaCityUsers: 1,
    total_fukuokaCityUsers: 1,
    unique_fukuokaCityUsers: 1,
  };
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: mockSeatUsageDailyReportsData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch in use seat usage logs by seat id", async () => {
    const startDate = "2025-03-14";
    const endDate = "2025-03-14";
    const { data, error } = await fetchSeatUsageDailyReports(
      startDate,
      endDate,
    );
    expect(data).toEqual(mockSeatUsageDailyReportsData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_daily_reports_view");
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*, key:date");
    expect(supabaseTableMock.gte).toHaveBeenCalledWith("date", startDate);
    expect(supabaseTableMock.lte).toHaveBeenCalledWith("date", endDate);
    expect(supabaseTableMock.order).toHaveBeenCalledWith("date", {
      ascending: true,
    });
  });
});

describe("fetchSeatUsageMonthlyReport", () => {
  const mockSeatUsageMonthlyReportData = {
    month: "2025-03",
    total_users: 1,
    unique_users: 1,
    total_overseas_users: 1,
    unique_overseas_users: 1,
    total_outside_fukuoka_pref_users: 1,
    unique_outside_fukuoka_pref_users: 1,
    total_fukuoka_pref_users: 1,
    unique_fukuoka_pref_users: 1,
    total_outside_fukuokaCityUsers: 1,
    unique_outside_fukuokaCityUsers: 1,
    total_fukuokaCityUsers: 1,
    unique_fukuokaCityUsers: 1,
  };
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: mockSeatUsageMonthlyReportData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch in use seat usage logs by seat id", async () => {
    const month = "2025-03";
    const { data, error } = await fetchSeatUsageMonthlyReports(month);
    expect(data).toEqual(mockSeatUsageMonthlyReportData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith(
      "seat_usage_monthly_reports_view",
    );
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*, key:month");
    expect(supabaseTableMock.eq).toHaveBeenCalledWith("month", month);
    expect(supabaseTableMock.order).toHaveBeenCalledWith("month", {
      ascending: true,
    });
  });
});

describe("fetchSeatUsageYearlyReport", () => {
  const mockSeatUsageYearlyReportData = {
    year: "2025",
    total_users: 1,
    unique_users: 1,
    total_overseas_users: 1,
    unique_overseas_users: 1,
    total_outside_fukuoka_pref_users: 1,
    unique_outside_fukuoka_pref_users: 1,
    total_fukuoka_pref_users: 1,
    unique_fukuoka_pref_users: 1,
    total_outside_fukuokaCityUsers: 1,
    unique_outside_fukuokaCityUsers: 1,
    total_fukuokaCityUsers: 1,
    unique_fukuokaCityUsers: 1,
  };
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: mockSeatUsageYearlyReportData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch in use seat usage logs by seat id", async () => {
    const year = "2025";
    const { data, error } = await fetchSeatUsageYearlyReports(year);
    expect(data).toEqual(mockSeatUsageYearlyReportData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith(
      "seat_usage_yearly_reports_view",
    );
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*, key:year");
    expect(supabaseTableMock.eq).toHaveBeenCalledWith("year", year);
    expect(supabaseTableMock.order).toHaveBeenCalledWith("year", {
      ascending: true,
    });
  });
});
