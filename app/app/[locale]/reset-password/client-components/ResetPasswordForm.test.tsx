import { render, screen, fireEvent, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import ResetPasswordForm from "./ResetPasswordForm";

// Mock dependencies
jest.mock("@/contexts/AuthContext");
jest.mock("next/navigation");
jest.mock("next-intl");

const mockUpdatePassword = jest.fn();
const mockPush = jest.fn();
const mockUseAuth = jest.mocked(useAuth);
const mockUseRouter = jest.mocked(useRouter);
const mockUseTranslations = jest.mocked(useTranslations);

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    mockUpdatePassword.mockClear();
    mockPush.mockClear();
    mockUseAuth.mockReturnValue({
      session: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: mockUpdatePassword,
      isInitialized: true,
    });
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    (mockUseTranslations as any).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        title: "新しいパスワードを設定",
        passwordLabel: "新しいパスワード",
        confirmPasswordLabel: "確認パスワード",
        submitButton: "パスワードを更新",
        passwordMinLength: "パスワードは8文字以上で入力してください",
        passwordComplexity:
          "パスワードは大文字、小文字、数字、記号を含む必要があります",
        confirmPasswordRequired: "確認パスワードを入力してください",
        passwordMismatch: "パスワードが一致しません",
        updating: "更新中...",
        successTitle: "パスワードを更新しました",
        successMessage: "パスワードが正常に更新されました",
        backToSignIn: "ログインページに戻る",
        errorMessage: "パスワードの更新に失敗しました",
      };
      return translations[key] || key;
    });
  });

  it("フォームが正しくレンダリングされること", () => {
    render(<ResetPasswordForm />);

    expect(screen.getByText("新しいパスワードを設定")).toBeInTheDocument();
    expect(screen.getByText("新しいパスワード")).toBeInTheDocument();
    expect(screen.getByText("確認パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "パスワードを更新" }),
    ).toBeInTheDocument();
  });

  it("フォーム送信時に正しい値でupdatePassword関数が呼ばれること", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    const submitButton = screen.getByTestId("submit-button");

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "Password123!" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "Password123!" },
      });
      fireEvent.submit(submitButton);
    });

    expect(mockUpdatePassword).toHaveBeenCalledWith("Password123!");
    expect(mockUpdatePassword).toHaveBeenCalledTimes(1);
  });
});
