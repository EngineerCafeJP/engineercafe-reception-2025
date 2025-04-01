import { renderHook, waitFor } from "@testing-library/react";
import { fetchInUseSeatUsageLogs } from "@/app/(reception)/queries/seat-usages-queries";
import { useInUseSeatUsages } from "./use-in-use-seat-usages";

jest.mock("@/utils/supabase/client");
jest.mock("@/app/(reception)/queries/seat-usages-queries");
describe("useInUseSeatUsages", () => {
  const mockSeatUsages = [
    {
      id: "123",
      user_id: "123",
      seat_id: "123",
      start_time: "2025-03-14 10:00:00",
      end_time: null,
    },
  ];

  beforeEach(() => {
    (fetchInUseSeatUsageLogs as jest.Mock).mockResolvedValue({
      data: mockSeatUsages,
      error: null,
    });
  });

  it("should return the in-use seat usages", async () => {
    const { result } = renderHook(() => useInUseSeatUsages());

    await waitFor(() => {
      expect(result.current.seatUsages).toEqual([
        {
          id: "123",
          userId: "123",
          seatId: "123",
          startTime: "2025-03-14 10:00:00",
          endTime: null,
        },
      ]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("when error occurs", () => {
    beforeEach(() => {
      (fetchInUseSeatUsageLogs as jest.Mock).mockResolvedValue({
        data: [],
        error: new Error("Error"),
      });
    });
    it("should return the in-use seat usages", async () => {
      const { result } = renderHook(() => useInUseSeatUsages());

      await waitFor(() => {
        expect(result.current.seatUsages).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });
});
