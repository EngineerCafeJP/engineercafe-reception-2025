import { act, renderHook } from "@testing-library/react";
import * as seatQueries from "@/[locale]/(reception)/queries/seats-queries";
import { useUpdateSeat } from "./use-update-seat";

jest.mock("@/[locale]/(reception)/queries/seats-queries");

describe("useUpdateSeat", () => {
  const seatData = {
    id: 1,
    name: "seat_name",
    attentionMessage: "seat_attention_message",
    outOfService: false,
  };
  const mockSeat = {
    id: 1,
    name: "seat_name",
    attentionMessage: "seat_attention_message",
    outOfService: false,
  };

  beforeEach(() => {
    (seatQueries.updateSeat as jest.Mock).mockResolvedValue({
      error: null,
    });
    (seatQueries.fetchSeatWithCategory as jest.Mock).mockResolvedValue({
      data: mockSeat,
      error: null,
    });
  });

  it("should update user", async () => {
    const { result } = renderHook(() => useUpdateSeat());

    await act(async () => {
      const updatedSeat = await result.current.update(1, seatData);
      expect(seatQueries.updateSeat).toHaveBeenCalledWith(1, seatData);
      expect(seatQueries.fetchSeatWithCategory).toHaveBeenCalledWith(1);
      expect(updatedSeat).toEqual(mockSeat);
    });
  });

  it("should return error when updateSeat fails", async () => {
    (seatQueries.updateSeat as jest.Mock).mockResolvedValue({
      error: new Error("Update failed"),
    });
    const { result } = renderHook(() => useUpdateSeat());
    await act(async () => {
      const updatedSeat = await result.current.update(1, seatData);
      expect(updatedSeat).toBeNull();
    });
    expect(result.current.error?.message).toEqual("Update failed");
  });

  it("should return error when fetchSeatWithCategory fails", async () => {
    (seatQueries.fetchSeatWithCategory as jest.Mock).mockResolvedValue({
      error: new Error("Fetch failed"),
    });
    const { result } = renderHook(() => useUpdateSeat());
    await act(async () => {
      const updatedSeat = await result.current.update(1, seatData);
      expect(updatedSeat).toBeNull();
    });
    expect(result.current.error).toEqual(new Error("Fetch failed"));
  });
});
