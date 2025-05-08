import { act, renderHook, waitFor } from "@testing-library/react";
import { useSeatUsageLogsByDate } from "@/app/(reception)/hooks";
import {
  fetchInUseSeatUsageLogs,
  fetchSeatUsageLogsByDate,
  fetchSeatUsageLogById,
  updateSeatUsageIsDeleted,
} from "@/app/(reception)/queries/seat-usages-queries";

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

describe("useSeatUsageLogsByDate", () => {
  describe("fetchSeatUsageLogsByDate", () => {
    beforeEach(() => {
      (fetchSeatUsageLogsByDate as jest.Mock).mockResolvedValue({
        data: mockSeatsData,
        error: null,
      });
    });

    it("fetched 2 logs", async () => {
      const { result } = renderHook(() => useSeatUsageLogsByDate(new Date()));
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
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
      });
    });
  });

  describe("fetchSeatUsageLogsByDate", () => {
    beforeEach(() => {
      (fetchSeatUsageLogsByDate as jest.Mock).mockResolvedValue({
        data: [],
        error: null,
      });
    });

    it("fetched 0 logs", async () => {
      const { result } = renderHook(() => useSeatUsageLogsByDate(new Date()));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.seatUsages).toEqual([]);
      });
    });
  });

  describe("fetchSeatUsageLogsByDate", () => {
    beforeEach(() => {
      (fetchSeatUsageLogsByDate as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error("Error"),
      });
    });
    it("error occurs on fetch", async () => {
      const { result } = renderHook(() => useSeatUsageLogsByDate(new Date()));

      await waitFor(() => {
        expect(result.current.seatUsages).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });

  describe("updateSeatUsageIsDeleted", () => {
    beforeEach(() => {
      (fetchInUseSeatUsageLogs as jest.Mock).mockResolvedValue({
        data: mockSeatsData,
        error: null,
      });
      (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
      (updateSeatUsageIsDeleted as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
    });
    it("done deleting logs", async () => {
      const { result } = renderHook(() => useSeatUsageLogsByDate(new Date()));

      await act(async () => {
        await result.current.updateUsageLogsIsDeleted(1002, true);
        expect(updateSeatUsageIsDeleted).toHaveBeenCalledWith(1002, true);
      });
    });
  });

  describe("updateSeatUsageIsDeleted", () => {
    beforeEach(() => {
      (fetchInUseSeatUsageLogs as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
      (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error("Error"),
      });
      (updateSeatUsageIsDeleted as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
    });
    it("error occurs before deleting logs", async () => {
      const { result } = renderHook(() => useSeatUsageLogsByDate(new Date()));

      await act(async () => {
        await result.current.updateUsageLogsIsDeleted(234, true);
      });
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe("updateSeatUsageIsDeleted", () => {
    beforeEach(() => {
      (fetchInUseSeatUsageLogs as jest.Mock).mockResolvedValue({
        data: mockSeatsData,
        error: null,
      });
      (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
      (updateSeatUsageIsDeleted as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error("Error"),
      });
    });
    it("error occurs on deleting logs", async () => {
      const { result } = renderHook(() => useSeatUsageLogsByDate(new Date()));

      await act(async () => {
        await result.current.updateUsageLogsIsDeleted(9876, true);
      });
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });
});
