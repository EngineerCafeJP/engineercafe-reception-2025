import { act, renderHook, waitFor } from "@testing-library/react";
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

  const createDeferred = <T>() => {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((promiseResolve) => {
      resolve = promiseResolve;
    });
    return { promise, resolve };
  };

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

  it("should return the users by search params id", async () => {
    const { result } = renderHook(() => useSearchUsers());

    await act(async () => {
      await result.current.fetch("1");
    });

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
      const { result } = renderHook(() => useSearchUsers());

      await act(async () => {
        await result.current.fetch("1");
      });

      await waitFor(() => {
        expect(result.current.users).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });

  describe("when fetch users returns error", () => {
    beforeEach(() => {
      (fetchUsersBySearchParams as jest.Mock).mockResolvedValue({
        data: null,
        error: new Error("Failed to fetch users"),
      });
    });

    it("should return empty array", async () => {
      const { result } = renderHook(() => useSearchUsers());

      await act(async () => {
        await result.current.fetch("1");
        expect(fetchUsersBySearchParams).toHaveBeenCalledWith({ id: 1 });
      });

      await waitFor(() => {
        expect(result.current.users).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });
  });

  it("should not overwrite latest users with stale search response", async () => {
    const firstSearch = createDeferred<{
      data: { id: string; name: string; email: string; phone: string }[];
      error: null;
    }>();
    const secondSearch = createDeferred<{
      data: { id: string; name: string; email: string; phone: string }[];
      error: null;
    }>();

    (fetchUsersBySearchParams as jest.Mock)
      .mockReturnValueOnce(firstSearch.promise)
      .mockReturnValueOnce(secondSearch.promise);

    const { result } = renderHook(() => useSearchUsers());

    let firstFetch = Promise.resolve();
    let secondFetch = Promise.resolve();

    act(() => {
      firstFetch = result.current.fetch("123");
      secondFetch = result.current.fetch("1234");
    });

    await act(async () => {
      secondSearch.resolve({
        data: [
          {
            id: "1234",
            name: "latest_user",
            email: "latest_user@example.com",
            phone: "09000001234",
          },
        ],
        error: null,
      });
      await secondFetch;
    });

    expect(result.current.users).toEqual([
      {
        id: "1234",
        name: "latest_user",
        email: "latest_user@example.com",
        phone: "09000001234",
      },
    ]);

    await act(async () => {
      firstSearch.resolve({
        data: [
          {
            id: "123",
            name: "stale_user",
            email: "stale_user@example.com",
            phone: "09000000123",
          },
        ],
        error: null,
      });
      await firstFetch;
    });

    expect(result.current.users).toEqual([
      {
        id: "1234",
        name: "latest_user",
        email: "latest_user@example.com",
        phone: "09000001234",
      },
    ]);
  });

  it("should not restore users from an in-flight search after clear", async () => {
    const search = createDeferred<{
      data: { id: string; name: string; email: string; phone: string }[];
      error: null;
    }>();

    (fetchUsersBySearchParams as jest.Mock).mockReturnValueOnce(search.promise);

    const { result } = renderHook(() => useSearchUsers());

    let fetchPromise = Promise.resolve();

    act(() => {
      fetchPromise = result.current.fetch("123");
    });

    act(() => {
      result.current.clear();
    });

    await act(async () => {
      search.resolve({
        data: [
          {
            id: "123",
            name: "stale_user",
            email: "stale_user@example.com",
            phone: "09000000123",
          },
        ],
        error: null,
      });
      await fetchPromise;
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
