import {
  fetchLatestRegisteredUserId,
  fetchUser,
  fetchUsersBySearchParams,
  updateUser,
} from "@/app/(reception)/queries/users-queries";
import supabase from "@/utils/supabase/client";

jest.mock("@/utils/supabase/client");

describe("fetchUsersBySearchParams", () => {
  const mockUsersData = [
    {
      id: 1,
      name: "user_name",
      email: "user_email",
      phone: "user_phone",
      created_at: "2025-03-14 10:00:00",
      end_time: null,
    },
  ];
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
  };

  describe("when no search params", () => {
    beforeEach(() => {
      jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock as any);
    });
    it("should fetch empty array", async () => {
      const { data, error } = await fetchUsersBySearchParams();
      expect(data).toEqual([]);
      expect(error).toBeNull();
    });
  });

  describe("when search params id", () => {
    beforeEach(() => {
      supabaseTableMock.eq = jest.fn().mockReturnValue({
        data: mockUsersData,
        error: mockError,
      });
      jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock as any);
    });

    it("should fetch users by search params", async () => {
      const searchParams = { id: 1 };
      const { data, error } = await fetchUsersBySearchParams(searchParams);
      expect(data).toEqual(mockUsersData);
      expect(error).toBeNull();
      expect(supabase.from).toHaveBeenCalledWith("users");
      expect(supabaseTableMock.select).toHaveBeenCalledWith("*");
    });
  });

  describe("when search params name", () => {
    beforeEach(() => {
      supabaseTableMock.or = jest.fn().mockReturnValue({
        data: mockUsersData,
        error: mockError,
      });
      jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock as any);
    });

    it("should fetch users by search params", async () => {
      const searchParams = { name: "user_name" };
      const { data, error } = await fetchUsersBySearchParams(searchParams);
      expect(data).toEqual(mockUsersData);
      expect(error).toBeNull();
      expect(supabase.from).toHaveBeenCalledWith("users");
      expect(supabaseTableMock.select).toHaveBeenCalledWith("*");
    });

    it("should fetch users by search params", async () => {
      const searchParams = { email: "user_email" };
      const { data, error } = await fetchUsersBySearchParams(searchParams);
      expect(data).toEqual(mockUsersData);
      expect(error).toBeNull();
      expect(supabase.from).toHaveBeenCalledWith("users");
    });

    it("should fetch users by search params", async () => {
      const searchParams = { phone: "user_phone" };
      const { data, error } = await fetchUsersBySearchParams(searchParams);
      expect(data).toEqual(mockUsersData);
      expect(error).toBeNull();
      expect(supabase.from).toHaveBeenCalledWith("users");
    });
  });
});

describe("fetchLatestRegisteredUserId", () => {
  const mockUsersData = [
    {
      id: 1,
      created_at: "2025-03-14 10:00:00",
    },
  ];
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: mockUsersData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock as any);
  });

  it("should fetch latest registered user id", async () => {
    const { data, error } = await fetchLatestRegisteredUserId();
    expect(data).toEqual(mockUsersData);
    expect(error).toBeNull();
  });
});

describe("fetchUser", () => {
  const mockUsersData = [
    {
      id: 1,
      name: "user_name",
      email: "user_email",
      phone: "user_phone",
      created_at: "2025-03-14 10:00:00",
    },
  ];
  const mockError = null;
  const supabaseTableMock = {
    select: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: mockUsersData,
      error: mockError,
    }),
  };

  beforeEach(() => {
    jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock as any);
  });

  it("should fetch user", async () => {
    const { data, error } = await fetchUser(1);
    expect(data).toEqual(mockUsersData);
    expect(error).toBeNull();
  });

  describe("when user not found", () => {
    const mockError = new Error("User not found");
    beforeEach(() => {
      supabaseTableMock.single = jest.fn().mockReturnValue({
        data: null,
        error: mockError,
      });
    });

    it("should fetch user", async () => {
      const { data, error } = await fetchUser(1);
      expect(data).toEqual(null);
      expect(error).toBeInstanceOf(Error);
    });
  });
});

describe("updateUser", () => {
  const mockUser = {
    id: 1,
    name: "user_name",
    email: "user_email",
    phone: "user_phone",
    created_at: "2025-03-14 10:00:00",
  };

  const mockError = null;
  const supabaseTableMock = {
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnValue({
      data: mockUser,
      error: mockError,
    }),
  };

  beforeEach(() => {
    jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock as any);
  });

  it("should update user", async () => {
    const { data, error } = await updateUser(1, mockUser);
    expect(data).toEqual(mockUser);
    expect(error).toBeNull();
  });

  describe("when user not found", () => {
    const mockError = new Error("User not found");
    beforeEach(() => {
      supabaseTableMock.eq = jest.fn().mockReturnValue({
        data: null,
        error: mockError,
      });
    });

    it("should update user", async () => {
      const { data, error } = await updateUser(1, mockUser);
      expect(data).toEqual(null);
      expect(error).toBeInstanceOf(Error);
    });
  });
});
