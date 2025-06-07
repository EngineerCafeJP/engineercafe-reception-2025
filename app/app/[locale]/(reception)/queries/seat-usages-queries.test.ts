import { format } from "date-fns";
import {
  createSeatUsage,
  fetchInUseSeatUsageLogs,
  fetchInUseSeatUsageLogsBySeatId,
  fetchSeatUsageLogById,
  fetchSeatUsageLogsByDate,
  updateSeatUsageEndtime,
  updateSeatUsageIsDeleted,
} from "@/app/[locale]/(reception)/queries/seat-usages-queries";
import supabase from "@/app/utils/supabase/client";

jest.mock("@/app/utils/supabase/client");

describe("fetchSeatUsageLogById", () => {
  const mockSeatUsageLogData = {
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
    single: jest.fn().mockResolvedValue({
      data: mockSeatUsageLogData,
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
    const id = 1;
    const { data, error } = await fetchSeatUsageLogById(id);
    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*");
    expect(supabaseTableMock.eq).toHaveBeenCalledWith("id", id);
    expect(supabaseTableMock.single).toHaveBeenCalled();
  });
});

describe("fetchSeatUsageLogsByDate", () => {
  const mockSeatUsageLogData = [
    {
      id: 1,
      seat_id: "101",
      user_id: "00001",
      start_time: "2025-01-01",
      end_time: "2025-01-01",
      is_delete: false,
      user: {
        id: "00001",
        name: "hoge",
      },
      seat: {
        id: "101",
        name: "101",
      },
    },
  ];
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lt: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: mockSeatUsageLogData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch seat usage logs by seat startTime", async () => {
    const startDate = new Date(2025, 3, 13);
    const endDate = new Date(2025, 3, 14);
    const { data, error } = await fetchSeatUsageLogsByDate(startDate);
    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.gte).toHaveBeenCalledWith(
      "start_time",
      format(startDate, "yyyy-MM-dd"),
    );
    expect(supabaseTableMock.lt).toHaveBeenCalledWith(
      "start_time",
      format(endDate, "yyyy-MM-dd"),
    );
    expect(supabaseTableMock.or).toHaveBeenCalledWith(
      "is_delete.eq.false,is_delete.is.null",
    );
    expect(supabaseTableMock.order).toHaveBeenCalledWith("start_time", {
      ascending: true,
    });
  });
});

describe("fetchInUseSeatUsageLogsBySeatId", () => {
  const mockSeatUsageLogData = {
    id: 1,
    seat_id: 1,
    user_id: 1,
    start_time: "2025-03-14 10:00:00",
    end_time: null,
  };
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    filter: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: mockSeatUsageLogData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch in use seat usage logs", async () => {
    const seatId = 1;
    const { data, error } = await fetchInUseSeatUsageLogsBySeatId(seatId);

    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*");
    expect(supabaseTableMock.eq).toHaveBeenCalledWith("seat_id", seatId);
    expect(supabaseTableMock.is).toHaveBeenCalledWith("end_time", null);
    expect(supabaseTableMock.single).toHaveBeenCalled();
  });
});

describe("fetchInUseSeatUsageLogs", () => {
  const mockSeatUsageLogData = [
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
    filter: jest.fn().mockResolvedValue({
      data: mockSeatUsageLogData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch in use seat usage logs", async () => {
    const { data, error } = await fetchInUseSeatUsageLogs();

    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.select).toHaveBeenCalledWith("*");
    expect(supabaseTableMock.filter).toHaveBeenCalledWith(
      "end_time",
      "is",
      null,
    );
  });
});

describe("createSeatUsage", () => {
  const mockSeatUsageLogData = {
    id: 1,
    seat_id: 1,
    user_id: 1,
    start_time: "2025-03-14 10:00:00",
    end_time: null,
  };
  const mockError = null;

  const supabaseTableMock = {
    insert: jest.fn().mockResolvedValue({
      data: mockSeatUsageLogData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    supabase.from = jest.fn().mockReturnValue(supabaseTableMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a seat usage", async () => {
    const seatId = 1;
    const userId = 1;
    const startTime = "2025-03-14 10:00:00";

    const { data, error } = await createSeatUsage(seatId, userId, startTime);

    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.insert).toHaveBeenCalledWith({
      seat_id: seatId,
      user_id: userId,
      start_time: startTime,
      created_at: expect.any(String),
    });
  });

  it("should return a seat usage with startTime is null", async () => {
    const seatId = 1;
    const userId = 1;

    const { data, error } = await createSeatUsage(seatId, userId);

    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.insert).toHaveBeenCalledWith({
      seat_id: seatId,
      user_id: userId,
      start_time: expect.any(String),
      created_at: expect.any(String),
    });
  });
});

describe("updateSeatUsageEndtime", () => {
  const mockSeatUsageLogData = {
    id: 1,
    seat_id: 1,
    user_id: 1,
    start_time: "2025-03-14 10:00:00",
    end_time: null,
  };
  const mockError = null;

  const supabaseTableMock = {
    update: jest.fn().mockReturnThis(),
    eq: jest
      .fn()
      .mockReturnValue({ data: mockSeatUsageLogData, error: mockError }),
  };

  beforeEach(() => {
    (supabase.from as jest.Mock).mockReturnValue(supabaseTableMock);
  });

  it("should update the seat usage end time", async () => {
    const seatUsageId = 1;
    const endTime = "2025-03-14 10:00:00";

    const { data, error } = await updateSeatUsageEndtime(seatUsageId, endTime);

    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.update).toHaveBeenCalledWith({
      end_time: endTime,
    });
  });
});

describe("updateSeatUsageIsDeleted", () => {
  const mockSeatUsageLogData = {
    id: 1,
    seat_id: 1,
    user_id: 1,
    is_delete: true,
  };
  const mockError = null;

  const supabaseTableMock = {
    update: jest.fn().mockReturnThis(),
    eq: jest
      .fn()
      .mockReturnValue({ data: mockSeatUsageLogData, error: mockError }),
  };

  beforeEach(() => {
    (supabase.from as jest.Mock).mockReturnValue(supabaseTableMock);
  });

  it("should update the seat usage end time", async () => {
    const seatUsageId = 1;
    const isDelete = true;

    const { data, error } = await updateSeatUsageIsDeleted(
      seatUsageId,
      isDelete,
    );

    expect(data).toEqual(mockSeatUsageLogData);
    expect(error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith("seat_usage_logs");
    expect(supabaseTableMock.update).toHaveBeenCalledWith({
      is_delete: isDelete,
    });
  });
});
