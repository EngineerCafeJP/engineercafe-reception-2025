import { renderHook, waitFor } from "@testing-library/react";
import { fetchSeatUsageLogsByStartTime } from "@/app/(reception)/queries/seat-usages-queries";
import {
  useInUsageLogsSearchLogs,
  useInUsageLogsSearchLogs,
  useInUsageLogsSearchLogs,
} from "./use-in-usage-logs-search-logs";

//jest.mock("@/utils/supabase/client");
jest.mock("@/app/(reception)/queries/seat-usages-queries");
const mockSeatsData = [
  {
    id: 1002,
    seatId: 101,
    userId: 1,
    startTime: new Date(2025, 1, 11, 10, 10, 10),
    endTime: new Date(2025, 1, 11, 10, 30, 10),
    isDeleted: false,
    seat: {
      id: 101,
      name: "１０１",
      categoryId: 1,
      seatCategory: "メインスペース",
    },
    user: {
      id: 1,
      code: "00001",
      name: "２２　２２２",
    },
  },
  {
    id: 1003,
    seatId: 102,
    userId: 2,
    startTime: new Date(2025, 1, 11, 10, 10, 10),
    endTime: new Date(2025, 1, 11, 11, 10, 10),
    isDeleted: false,
    seat: {
      id: 102,
      name: "１０２",
      categoryId: 1,
      seatCategory: "メインスペース",
    },
    user: {
      id: 2,
      code: "00002",
      name: "３３３３３",
    },
  },
];

describe("useInUsageLogsSearchLogs", () => {
  describe("fetch any data", () => {
    beforeEach(() => {
      (fetchSeatUsageLogsByStartTime as jest.Mock).mockResolvedValue({
        data: mockSeatsData,
        error: null,
      });
    });

    it("should return 2 logs", async () => {
      const { result } = renderHook(() =>
        useInUsageLogsSearchLogs(false, new Date(2025, 1, 11)),
      );

      await waitFor(() => {
        expect(result.current.seatUsages).toEqual([
          {
            id: 1002,
            seatId: 101,
            userId: 1,
            startTime: new Date(2025, 1, 11, 10, 10, 10),
            endTime: new Date(2025, 1, 11, 10, 30, 10),
            isDeleted: false,
            seat: {
              id: 101,
              name: "１０１",
              categoryId: 1,
              seatCategory: "メインスペース",
            },
            user: {
              id: 1,
              code: "00001",
              name: "２２　２２２",
            },
          },
          {
            id: 1003,
            seatId: 102,
            userId: 2,
            startTime: new Date(2025, 1, 11, 10, 10, 10),
            endTime: new Date(2025, 1, 11, 11, 10, 10),
            isDeleted: false,
            seat: {
              id: 102,
              name: "１０２",
              categoryId: 1,
              seatCategory: "メインスペース",
            },
            user: {
              id: 2,
              code: "00002",
              name: "３３３３３",
            },
          },
        ]);

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe("fetch no data", () => {
    beforeEach(() => {
      (fetchSeatUsageLogsByStartTime as jest.Mock).mockResolvedValue({
        data: [],
        error: null,
      });
    });

    it("should return 0 logs", async () => {
      const { result } = renderHook(() =>
        useInUsageLogsSearchLogs(false, new Date(2025, 3, 11)),
      );

      await waitFor(() => {
        expect(result.current.seatUsages).toEqual([]);

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe("error occurs on fetch", () => {
    beforeEach(() => {
      (fetchSeatUsageLogsByStartTime as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error("Error"),
      });
    });
    it("should return the error", async () => {
      const { result } = renderHook(() =>
        useInUsageLogsSearchLogs(false, new Date(2024, 12, 31)),
      );

      await waitFor(() => {
        expect(result.current.seatUsages).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });
});
