import { renderHook, waitFor } from "@testing-library/react";
import { getSeatsWithCategory } from "@/app/(reception)/queries/seats-queries";
import { useSeatsWithCategory } from "./use-seats-with-category";

jest.mock("@/app/(reception)/queries/seats-queries");

const mockSeatsData = [
  {
    id: 1,
    name: "座席1",
    category_id: 1,
    seat_category: { id: 1, name: "カテゴリ1" },
  },
  {
    id: 2,
    name: "座席2",
    category_id: 2,
    seat_category: { id: 2, name: "カテゴリ2" },
  },
  {
    id: 3,
    name: "座席3",
    category_id: 1,
    seat_category: { id: 1, name: "カテゴリ1" },
  },
];

describe("useSeatsWithCategory", () => {
  beforeEach(() => {
    (getSeatsWithCategory as jest.Mock).mockResolvedValue({
      data: mockSeatsData,
      error: null,
    });
  });

  it("should return seats with the correct category", async () => {
    const { result } = renderHook(() => useSeatsWithCategory());

    await waitFor(() => {
      expect(result.current.seats).toEqual([
        {
          id: 1,
          name: "座席1",
          categoryId: 1,
          seatCategory: { id: 1, name: "カテゴリ1" },
        },
        {
          id: 2,
          name: "座席2",
          categoryId: 2,
          seatCategory: { id: 2, name: "カテゴリ2" },
        },
        {
          id: 3,
          name: "座席3",
          categoryId: 1,
          seatCategory: { id: 1, name: "カテゴリ1" },
        },
      ]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("when error occurs", () => {
    beforeEach(() => {
      (getSeatsWithCategory as jest.Mock).mockResolvedValue({
        data: [],
        error: new Error("Error"),
      });
    });
    it("should return the error", async () => {
      const { result } = renderHook(() => useSeatsWithCategory());

      await waitFor(() => {
        expect(result.current.seats).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });
});
