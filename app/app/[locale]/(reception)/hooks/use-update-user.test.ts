import { act, renderHook } from "@testing-library/react";
import * as userQueries from "@/app/[locale]/(reception)/queries/users-queries";
import { useUpdateUser } from "./use-update-user";

jest.mock("@/app/[locale]/(reception)/queries/users-queries");

describe("useUpdateUser", () => {
  const userData = {
    id: 1,
    name: "user_name",
    email: "user_email",
    phone: "user_phone",
  };
  const mockUser = {
    id: 1,
    name: "user_name",
    email: "user_email",
    phone: "user_phone",
  };

  beforeEach(() => {
    (userQueries.updateUser as jest.Mock).mockResolvedValue({
      error: null,
    });
    (userQueries.fetchUser as jest.Mock).mockResolvedValue({
      data: mockUser,
      error: null,
    });
  });

  it("should update user", async () => {
    const { result } = renderHook(() => useUpdateUser());

    await act(async () => {
      const updatedUser = await result.current.update(1, userData);
      expect(userQueries.updateUser).toHaveBeenCalledWith(1, userData);
      expect(userQueries.fetchUser).toHaveBeenCalledWith(1);
      expect(updatedUser).toEqual(mockUser);
    });
  });

  it("should return error when updateUser fails", async () => {
    (userQueries.updateUser as jest.Mock).mockResolvedValue({
      error: new Error("Update failed"),
    });
    const { result } = renderHook(() => useUpdateUser());
    await act(async () => {
      const updatedUser = await result.current.update(1, userData);
      expect(updatedUser).toBeNull();
    });
    expect(result.current.error?.message).toEqual("Update failed");
  });

  it("should return error when fetchUser fails", async () => {
    (userQueries.fetchUser as jest.Mock).mockResolvedValue({
      error: new Error("Fetch failed"),
    });
    const { result } = renderHook(() => useUpdateUser());
    await act(async () => {
      const updatedUser = await result.current.update(1, userData);
      expect(updatedUser).toBeNull();
    });
    expect(result.current.error).toEqual(new Error("Fetch failed"));
  });
});
