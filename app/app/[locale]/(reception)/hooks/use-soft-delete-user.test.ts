import { act, renderHook } from "@testing-library/react";
import * as userQueries from "@/[locale]/(reception)/queries/users-queries";
import { useSoftDeleteUser } from "./use-soft-delete-user";

jest.mock("@/[locale]/(reception)/queries/users-queries");

describe("useSoftDeleteUser", () => {
  beforeEach(() => {
    (userQueries.softDeleteUser as jest.Mock).mockResolvedValue({
      error: null,
    });
  });

  it("should soft delete user successfully", async () => {
    const { result } = renderHook(() => useSoftDeleteUser());

    await act(async () => {
      await result.current.softDeleteUser(1);
      expect(userQueries.softDeleteUser).toHaveBeenCalledWith(1);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when softDeleteUser fails", async () => {
    (userQueries.softDeleteUser as jest.Mock).mockResolvedValue({
      error: new Error("Soft delete failed"),
    });

    const { result } = renderHook(() => useSoftDeleteUser());

    await act(async () => {
      await result.current.softDeleteUser(1);
    });

    expect(result.current.error?.message).toEqual("Soft delete failed");
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle exception when softDeleteUser throws", async () => {
    (userQueries.softDeleteUser as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    const { result } = renderHook(() => useSoftDeleteUser());

    await act(async () => {
      await result.current.softDeleteUser(1);
    });

    expect(result.current.error?.message).toEqual("Network error");
    expect(result.current.isLoading).toBe(false);
  });

  it("should set loading state correctly", async () => {
    const { result } = renderHook(() => useSoftDeleteUser());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.softDeleteUser(1);
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      // Wait for the async operation to complete
    });

    expect(result.current.isLoading).toBe(false);
  });
});
