import { act, renderHook } from "@testing-library/react";
import { useSeatUsage } from "@/[locale]/(reception)/hooks/use-seat-usage";
import {
  createSeatUsage,
  updateSeatUsageEndtime,
  fetchSeatUsageLogById,
  fetchInUseSeatUsageLogsBySeatId,
} from "@/[locale]/(reception)/queries/seat-usages-queries";

jest.mock("@/[locale]/(reception)/queries/seat-usages-queries");

describe("useSeatUsage", () => {
  const mockSeatUsage = {
    id: 1,
    user_id: 1,
    seat_id: 1,
    start_time: "2025-03-14 10:00:00",
    end_time: null,
  };
  beforeEach(() => {
    (createSeatUsage as jest.Mock).mockResolvedValue({
      data: mockSeatUsage,
      error: null,
    });
    (updateSeatUsageEndtime as jest.Mock).mockResolvedValue({
      error: null,
    });
    (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
      data: mockSeatUsage,
      error: null,
    });
    (fetchInUseSeatUsageLogsBySeatId as jest.Mock).mockResolvedValue({
      data: mockSeatUsage,
      error: null,
    });
  });

  describe("create", () => {
    beforeEach(() => {
      (fetchInUseSeatUsageLogsBySeatId as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
    });
    it("should create a seat usage", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.create(1, 1, "2025-03-14 10:00:00", 120);
        expect(createSeatUsage).toHaveBeenCalledWith(
          1,
          1,
          expect.any(String),
          120,
        );
      });
    });

    describe("when error occurs in fetchSeatUsageLogById", () => {
      beforeEach(() => {
        (fetchInUseSeatUsageLogsBySeatId as jest.Mock).mockResolvedValue({
          data: mockSeatUsage,
          error: "Error",
        });
      });
      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.create(1, 1);
        });
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });

    describe("when error occurs in createSeatUsage", () => {
      beforeEach(() => {
        (createSeatUsage as jest.Mock).mockResolvedValue({
          data: null,
          error: "Error",
        });
      });

      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.create(1, 1);
        });
        expect(result.current.error).toBe("Error");
      });
    });
  });

  describe("extendSeatUsage", () => {
    const seatUsage = {
      id: 1,
      userId: 1,
      seatId: 1,
      startTime: "2025-03-14 10:00:00",
      endTime: null,
      remark: "",
      usageDurationMinutes: 120,
    };
    it("should update the seat usage endtime", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.extendSeatUsage(seatUsage);
        expect(updateSeatUsageEndtime).toHaveBeenCalledWith(
          1,
          expect.any(String),
        );
        expect(createSeatUsage).toHaveBeenCalledWith(
          1,
          1,
          expect.any(String),
          120,
        );
      });
    });

    describe("when error occurs in fetchSeatUsageLogById", () => {
      beforeEach(() => {
        (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
          data: null,
          error: "Error",
        });
      });

      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.extendSeatUsage(seatUsage);
        });
        expect(result.current.error).toBe("Error");
      });
    });

    describe("when error occurs in updateSeatUsageEndtime", () => {
      beforeEach(() => {
        (updateSeatUsageEndtime as jest.Mock).mockResolvedValue({
          error: "Error",
        });
      });
      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.extendSeatUsage(seatUsage);
        });
        expect(result.current.error).toBe("Error");
      });
    });

    describe("when error occurs in createSeatUsage", () => {
      beforeEach(() => {
        (createSeatUsage as jest.Mock).mockResolvedValue({
          data: null,
          error: "Error",
        });
      });
      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.extendSeatUsage(seatUsage);
        });
        expect(result.current.error).toBe("Error");
      });
    });
  });

  describe("finishSeatUsage", () => {
    const seatUsage = {
      id: 1,
      userId: 1,
      seatId: 1,
      startTime: "2025-03-14 10:00:00",
      endTime: null,
      remark: "",
      usageDurationMinutes: 120,
    };
    it("should update the seat usage endtime", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.finishSeatUsage(seatUsage);
        expect(updateSeatUsageEndtime).toHaveBeenCalledWith(
          1,
          expect.any(String),
          { onlyInUse: true },
        );
      });
    });

    it("should reject a usage whose stored start time is still in the future", async () => {
      (fetchSeatUsageLogById as jest.Mock).mockResolvedValueOnce({
        data: { ...mockSeatUsage, start_time: "2099-03-14T10:00:00Z" },
        error: null,
      });
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.finishSeatUsage(seatUsage);
      });

      expect(updateSeatUsageEndtime).not.toHaveBeenCalled();
      expect(result.current.error?.message).toBe(
        "利用開始前のため退席できません。",
      );
      expect(result.current.isLoading).toBe(false);
    });

    it("should leave an already finished usage alone", async () => {
      (fetchSeatUsageLogById as jest.Mock).mockResolvedValueOnce({
        data: { ...mockSeatUsage, end_time: "2025-03-14T12:00:00Z" },
        error: null,
      });
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.finishSeatUsage(seatUsage);
      });

      expect(updateSeatUsageEndtime).not.toHaveBeenCalled();
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    describe("when error occurs in fetchSeatUsageLogById", () => {
      beforeEach(() => {
        (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
          data: null,
          error: "Error",
        });
      });

      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.finishSeatUsage(seatUsage);
        });
        expect(result.current.error).toBe("Error");
      });
    });

    describe("when error occurs in updateSeatUsageEndtime", () => {
      beforeEach(() => {
        (updateSeatUsageEndtime as jest.Mock).mockResolvedValue({
          error: "Error",
        });
      });
      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.finishSeatUsage(seatUsage);
        });
        expect(result.current.error).toBe("Error");
      });
    });
  });

  describe("moveSeat", () => {
    const prevSeatUsage = {
      id: 1,
      userId: 1,
      seatId: 1,
      startTime: "2025-03-14 10:00:00",
      endTime: null,
      remark: "",
      usageDurationMinutes: 120,
    };
    const nextSeatUsage = {
      id: 2,
      userId: 2,
      seatId: 2,
      startTime: "2025-03-14 10:00:00",
      endTime: null,
      remark: "",
      usageDurationMinutes: 120,
    };
    it("should update the seat usage endtime", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.moveSeat(prevSeatUsage, nextSeatUsage);
        expect(updateSeatUsageEndtime).toHaveBeenCalledWith(
          prevSeatUsage.id,
          expect.any(String),
        );
        expect(createSeatUsage).toHaveBeenCalledWith(
          nextSeatUsage.seatId,
          nextSeatUsage.userId,
          nextSeatUsage.startTime,
          nextSeatUsage.usageDurationMinutes,
        );
      });
    });

    describe("when error occurs in fetchSeatUsageLogById", () => {
      beforeEach(() => {
        (fetchSeatUsageLogById as jest.Mock).mockResolvedValue({
          data: null,
          error: "Error",
        });
      });

      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.moveSeat(prevSeatUsage, nextSeatUsage);
        });
        expect(result.current.error).toBe("Error");
      });
    });

    describe("when error occurs in updateSeatUsageEndtime", () => {
      beforeEach(() => {
        (updateSeatUsageEndtime as jest.Mock).mockResolvedValue({
          error: "Error",
        });
      });

      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.moveSeat(prevSeatUsage, nextSeatUsage);
        });
      });
    });

    describe("when error occurs in createSeatUsage", () => {
      beforeEach(() => {
        (createSeatUsage as jest.Mock).mockResolvedValue({
          data: null,
          error: "Error",
        });
      });
      it("should return the error", async () => {
        const { result } = renderHook(() => useSeatUsage());
        await act(async () => {
          await result.current.moveSeat(prevSeatUsage, nextSeatUsage);
        });
      });
    });
  });
});
