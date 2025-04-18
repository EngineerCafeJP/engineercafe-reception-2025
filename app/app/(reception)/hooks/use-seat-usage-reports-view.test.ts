import { act, renderHook, waitFor } from "@testing-library/react";
import humps from "humps";
import {
  useSeatUsageDailyReports,
  useSeatUsageMonthlyReport,
  useSeatUsageYearlyReport,
} from "@/app/(reception)/hooks/use-seat-usage-reports-view";
import {
  fetchSeatUsageDailyReports,
  fetchSeatUsageMonthlyReport,
  fetchSeatUsageYearlyReport,
} from "@/app/(reception)/queries/seat-usage-report-queries";

jest.mock("@/app/(reception)/queries/seat-usage-report-queries");

const mockSeatUsageReportData = {
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

const mockSeatUsageDailyReportData = {
  ...mockSeatUsageReportData,
  date: "2025-03-14",
};

const mockSeatUsageMonthlyReportData = {
  ...mockSeatUsageReportData,
  month: "2025-03",
};

const mockSeatUsageYearlyReportData = {
  ...mockSeatUsageReportData,
  year: "2025",
};

describe("useSeatUsageDailyReports", () => {
  beforeEach(() => {
    (fetchSeatUsageDailyReports as jest.Mock).mockResolvedValue({
      data: [mockSeatUsageDailyReportData],
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const startDate = "2025-03-01";
  const endDate = "2025-03-31";

  it("should fetch seat usage daily reports", async () => {
    const { result } = renderHook(() =>
      useSeatUsageDailyReports(startDate, endDate),
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([
        humps.camelizeKeys(mockSeatUsageDailyReportData),
      ]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("does not fetch data if no start date and end date are provided", async () => {
    await act(async () => {
      renderHook(() => useSeatUsageDailyReports());
      expect(fetchSeatUsageDailyReports).not.toHaveBeenCalled();
    });
  });

  it("should return an error if the data is not returned", async () => {
    (fetchSeatUsageDailyReports as jest.Mock).mockResolvedValue({
      data: null,
      error: new Error("Error"),
    });
    const { result } = renderHook(() =>
      useSeatUsageDailyReports(startDate, endDate),
    );
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error("Error"));
      expect(result.current.isLoading).toBe(false);
    });
  });
});

describe("useSeatUsageMonthlyReport", () => {
  beforeEach(() => {
    (fetchSeatUsageMonthlyReport as jest.Mock).mockResolvedValue({
      data: mockSeatUsageMonthlyReportData,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const month = "2025-03";

  it("should fetch seat usage monthly report", async () => {
    const { result } = renderHook(() => useSeatUsageMonthlyReport(month));
    await waitFor(() => {
      expect(result.current.data).toEqual(
        humps.camelizeKeys(mockSeatUsageMonthlyReportData),
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should return an error if the data is not returned", async () => {
    (fetchSeatUsageMonthlyReport as jest.Mock).mockResolvedValue({
      data: null,
      error: new Error("Error"),
    });
    const { result } = renderHook(() => useSeatUsageMonthlyReport(month));
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error("Error"));
      expect(result.current.isLoading).toBe(false);
    });
  });
});

describe("useSeatUsageYearlyReport", () => {
  beforeEach(() => {
    (fetchSeatUsageYearlyReport as jest.Mock).mockResolvedValue({
      data: mockSeatUsageYearlyReportData,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const year = "2025";

  it("should fetch seat usage yearly report", async () => {
    const { result } = renderHook(() => useSeatUsageYearlyReport(year));
    await waitFor(() => {
      expect(result.current.data).toEqual(
        humps.camelizeKeys(mockSeatUsageYearlyReportData),
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should return an error if the data is not returned", async () => {
    (fetchSeatUsageYearlyReport as jest.Mock).mockResolvedValue({
      data: null,
      error: new Error("Error"),
    });
    const { result } = renderHook(() => useSeatUsageYearlyReport(year));
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error("Error"));
      expect(result.current.isLoading).toBe(false);
    });
  });
});
