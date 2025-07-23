import {
  fetchSeatWithCategory,
  getSeats,
  getSeatsWithCategory,
  updateSeat,
} from "@/[locale]/(reception)/queries/seats-queries";
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
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
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
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
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

describe("fetchSeatWithCategory", () => {
  const mockSeatData = {
    id: 1,
    seat_id: 1,
    user_id: 1,
    start_time: "2025-03-14 10:00:00",
    end_time: null,
  };

  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockResolvedValue({
      data: mockSeatData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch seat with category", async () => {
    const { data, error } = await fetchSeatWithCategory(1);
    expect(data).toEqual(mockSeatData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seats");
    expect(supabaseTableMock.select).toHaveBeenCalledWith(
      "*, seat_category:seat_categories(*)",
    );
  });

  describe("when error occurs", () => {
    beforeEach(() => {
      supabaseTableMock.maybeSingle.mockResolvedValue({
        data: null,
        error: new Error("Error"),
      });
    });

    it("should return error when fetch seat with category fails", async () => {
      const { data, error } = await fetchSeatWithCategory(1);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});

describe("updateSeat", () => {
  const mockSeatData = {
    id: 1,
    seat_id: 1,
    user_id: 1,
    start_time: "2025-03-14 10:00:00",
    end_time: null,
  };

  const mockError = null;
  const supabaseTableMock = {
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update seat", async () => {
    const { error } = await updateSeat(1, {
      outOfService: true,
      attentionMessage: "Attention message",
    });

    expect(supabase.from).toHaveBeenCalledWith("seats");
    expect(supabaseTableMock.update).toHaveBeenCalledWith({
      out_of_service: true,
      attention_message: "Attention message",
    });
    expect(supabaseTableMock.eq).toHaveBeenCalledWith("id", 1);
  });

  describe("when error occurs", () => {
    beforeEach(() => {
      supabaseTableMock.eq.mockResolvedValue({
        data: null,
        error: new Error("Error"),
      });
    });

    it("should return error when update seat fails", async () => {
      const { data, error } = await updateSeat(1, {
        outOfService: true,
        attentionMessage: "Attention message",
      });
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
