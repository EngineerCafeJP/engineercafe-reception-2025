import { render, screen, fireEvent, act } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import ForgotPasswordForm from "./ForgotPasswordForm";

// Mock dependencies
jest.mock("@/contexts/AuthContext");
jest.mock("next-intl");

const mockResetPassword = jest.fn();
const mockUseAuth = jest.mocked(useAuth);
const mockUseTranslations = jest.mocked(useTranslations);

describe("ForgotPasswordForm", () => {
  beforeEach(() => {
    mockResetPassword.mockClear();
    mockUseAuth.mockReturnValue({
      session: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPassword: mockResetPassword,
      updatePassword: jest.fn(),
      isInitialized: true,
    });
    (mockUseTranslations as any).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        title: "パスワードを忘れた方",
        emailLabel: "メールアドレス",
        submitButton: "リセットメールを送信",
        emailRequired: "メールアドレスを入力してください",
        emailInvalid: "有効なメールアドレスを入力してください",
        submitting: "送信中...",
        successTitle: "メールを送信しました",
        successMessage: "パスワードリセット用のメールを送信しました",
        successInstruction: "メール内のリンクをクリックしてください",
        checkSpamFolder: "迷惑メールフォルダもご確認ください",
        errorMessage: "パスワードリセットメールの送信に失敗しました",
      };
      return translations[key] || key;
    });
  });

  it("フォームが正しくレンダリングされること", () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByText("パスワードを忘れた方")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "リセットメールを送信" }),
    ).toBeInTheDocument();
  });

  it("フォーム送信時に正しい値でresetPassword関数が呼ばれること", async () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.submit(submitButton);
    });

    expect(mockResetPassword).toHaveBeenCalledWith("test@example.com");
    expect(mockResetPassword).toHaveBeenCalledTimes(1);
  });
});
