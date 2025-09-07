import { Session, Subscription, User } from "@supabase/supabase-js";
import { render, screen, act, renderHook } from "@testing-library/react";
import supabase from "@/utils/supabase/client";
import { AuthProvider, useAuth } from "./AuthContext";

jest.mock("@/utils/supabase/client");

// テスト用のコンシューマーコンポーネント
const TestComponent = () => {
  const { session, signIn, signOut } = useAuth();
  return (
    <div>
      <div data-testid="session">{session ? "signed in" : "signed out"}</div>
      <button onClick={() => signIn("test@example.com", "password")}>
        Sign In
      </button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

describe("AuthContext", () => {
  const mockUser = {
    id: "123",
    email: "test@example.com",
  } as unknown as User;
  const mockSession = {
    user: mockUser,
    access_token: "123",
    refresh_token: "123",
    expires_in: 1000,
    token_type: "Bearer",
  } as unknown as Session;

  beforeEach(() => {
    jest.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    jest.mocked(supabase.auth.onAuthStateChange).mockImplementation(() => {
      return {
        data: {
          subscription: {
            id: "123",
            unsubscribe: jest.fn(),
          } as unknown as Subscription,
        },
      };
    });

    jest.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: {
        user: mockUser,
        session: mockSession,
      },
      error: null,
    });
    jest.mocked(supabase.auth.signOut).mockResolvedValue({
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("サインイン", () => {
    it("signInボタンをクリックするとサインインが実行される", async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      const signInButton = screen.getByText("Sign In");

      await act(async () => {
        signInButton.click();
      });

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });
  });

  describe("サインアウト", () => {
    it("signOutボタンをクリックするとサインアウトが実行される", async () => {
      await act(async () => {
        render(
          <AuthProvider>
            <TestComponent />
          </AuthProvider>,
        );
      });

      // サインアウト
      const signOutButton = screen.getByText("Sign Out");
      await act(async () => {
        signOutButton.click();
      });

      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe("セッションの変更", () => {
    let callbackMock: any;

    beforeEach(() => {
      jest
        .mocked(supabase.auth.onAuthStateChange)
        .mockImplementation((callback) => {
          callbackMock = callback;
          return {
            data: {
              subscription: {
                id: "123",
                unsubscribe: jest.fn(),
              } as unknown as Subscription,
            },
          };
        });
    });

    describe("初期状態", () => {
      it("セッションがnullである", async () => {
        let handleResult: any;
        await act(async () => {
          const wrapper = ({ children }: { children: React.ReactNode }) => (
            <AuthProvider>{children}</AuthProvider>
          );

          const { result } = renderHook(() => useAuth(), { wrapper });
          handleResult = result;
        });
        expect(handleResult.current.session).toEqual(null);
      });
    });

    describe("サインイン", () => {
      it("サインイン後はセッションが変更される", async () => {
        let handleResult: any;

        await act(async () => {
          const wrapper = ({ children }: { children: React.ReactNode }) => (
            <AuthProvider>{children}</AuthProvider>
          );

          const { result } = renderHook(() => useAuth(), { wrapper });
          handleResult = result;
        });
        await act(async () => {
          callbackMock("SIGNED_IN", mockSession);
        });
        expect(handleResult.current.session).toEqual(mockSession);
      });
    });

    describe("サインアウト", () => {
      it("サインアウト後はセッションが変更される", async () => {
        let handleResult: any;

        await act(async () => {
          const wrapper = ({ children }: { children: React.ReactNode }) => (
            <AuthProvider>{children}</AuthProvider>
          );
          const { result } = renderHook(() => useAuth(), { wrapper });
          handleResult = result;
        });

        await act(async () => {
          callbackMock("SIGNED_IN", mockSession);
        });

        await act(async () => {
          callbackMock("SIGNED_OUT", null);
        });
        expect(handleResult.current.session).toEqual(null);
      });
    });
  });
});

describe("useAuth", () => {
  test("AuthProviderの外でuseAuthを使用するとエラーが発生する", () => {
    // エラーがスローされることを期待
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");
  });
});
