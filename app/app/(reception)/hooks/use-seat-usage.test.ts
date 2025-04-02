import { act, renderHook } from "@testing-library/react";
import { useSeatUsage } from "@/app/(reception)/hooks/use-seat-usage";
import {
  createSeatUsage,
  updateSeatUsageEndtime,
  fetchSeatUsageLogById,
  fetchInUseSeatUsageLogsBySeatId,
} from "@/app/(reception)/queries/seat-usages-queries";

jest.mock("@/app/(reception)/queries/seat-usages-queries");

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
    it("should create a seat usage", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.create(1, 1);
        expect(createSeatUsage).toHaveBeenCalledWith(1, 1);
      });
    });

    describe("when error occurs in fetchSeatUsageLogById", () => {
      beforeEach(() => {
        (fetchInUseSeatUsageLogsBySeatId as jest.Mock).mockResolvedValue({
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
    };
    it("should update the seat usage endtime", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.extendSeatUsage(seatUsage);
        expect(updateSeatUsageEndtime).toHaveBeenCalledWith(
          1,
          expect.any(String),
        );
        expect(createSeatUsage).toHaveBeenCalledWith(1, 1);
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
    };
    it("should update the seat usage endtime", async () => {
      const { result } = renderHook(() => useSeatUsage());

      await act(async () => {
        await result.current.finishSeatUsage(seatUsage);
        expect(updateSeatUsageEndtime).toHaveBeenCalledWith(
          1,
          expect.any(String),
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
    };
    const nextSeatUsage = {
      id: 2,
      userId: 2,
      seatId: 2,
      startTime: "2025-03-14 10:00:00",
      endTime: null,
      remark: "",
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
