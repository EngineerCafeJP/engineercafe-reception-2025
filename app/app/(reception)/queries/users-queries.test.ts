import { fetchUsersBySearchParams } from "@/app/(reception)/queries/users-queries";
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
      jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock);
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
      jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock);
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
      jest.spyOn(supabase, "from").mockReturnValue(supabaseTableMock);
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
