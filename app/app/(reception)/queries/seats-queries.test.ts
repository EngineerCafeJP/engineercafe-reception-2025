import {
  getSeats,
  getSeatsWithCategory,
} from "@/app/(reception)/queries/seats-queries";
import supabase from "@/utils/supabase/client";

jest.mock("@/utils/supabase/client");

describe("getSeats", () => {
  const mockSeatsData = [
    {
      id: 1,
      seat_id: 1,
      user_id: 1,
      start_time: "2025-03-14 10:00:00",
      end_time: null,
    },
  ];
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockResolvedValue({
      data: mockSeatsData,
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
    const { data, error } = await getSeats();
    expect(data).toEqual(mockSeatsData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seats");
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*");
  });
});

describe("getSeatsWithCategory", () => {
  const mockSeatsData = [
    {
      id: 1,
      seat_id: 1,
      user_id: 1,
      start_time: "2025-03-14 10:00:00",
      end_time: null,
      seat_category: {
        id: 1,
        name: "category_name",
      },
      created_at: "2025-03-14 10:00:00",
      updated_at: "2025-03-14 10:00:00",
    },
  ];
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockResolvedValue({
      data: mockSeatsData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch seats with category", async () => {
    const { data, error } = await getSeatsWithCategory();
    expect(data).toEqual(mockSeatsData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seats");
    expect(supabaseTableMock.select).toHaveBeenCalledWith(
      "*, seat_category:seat_categories(*)",
    );
  });
});
