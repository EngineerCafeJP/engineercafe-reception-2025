import { renderHook, waitFor } from "@testing-library/react";
import { fetchUsersBySearchParams } from "@/[locale]/(reception)/queries/users-queries";
import { useSearchUsers } from "./use-search-users";

jest.mock("@/utils/supabase/client");
jest.mock("@/[locale]/(reception)/queries/users-queries");

describe("useSearchUsers", () => {
  const mockUsers = [
    {
      id: "123",
      name: "user_name",
      email: "user_email",
      phone: "user_phone",
    },
  ];

  beforeEach(() => {
    (fetchUsersBySearchParams as jest.Mock).mockResolvedValue({
      data: mockUsers,
      error: null,
    });
  });

  it("should return empty array when no keyword", async () => {
    const { result } = renderHook(() => useSearchUsers());

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should return the users by search params", async () => {
    const { result } = renderHook(() => useSearchUsers("word"));

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(fetchUsersBySearchParams).toHaveBeenCalledWith({
        name: "word",
        email: "word",
        phone: "word",
      });
    });
  });

  it("should return the users by search params id", async () => {
    const { result } = renderHook(() => useSearchUsers("1"));

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(fetchUsersBySearchParams).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe("when fetch users returns null", () => {
    beforeEach(() => {
      (fetchUsersBySearchParams as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error("Failed to fetch users"),
      });
    });

    it("should return empty array", async () => {
      const { result } = renderHook(() => useSearchUsers("word"));

      await waitFor(() => {
        expect(result.current.users).toEqual([]);
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("when fetch users returns error", () => {
    beforeEach(() => {
      (fetchUsersBySearchParams as jest.Mock).mockResolvedValue({
        data: mockUsers,
        error: new Error("Failed to fetch users"),
      });
    });

    it("should return empty array", async () => {
      const { result } = renderHook(() => useSearchUsers("word"));

      await waitFor(() => {
        expect(result.current.users).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });
});
