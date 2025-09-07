import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "@/contexts/AuthContext";
import ForgotPasswordForm from "./ForgotPasswordForm";

// Mock dependencies
vi.mock("@/contexts/AuthContext");
vi.mock("next-intl");

const mockResetPassword = vi.fn();
const mockUseAuth = useAuth as any;
const mockUseTranslations = useTranslations as any;

const mockTranslations = {
  title: "パスワードを忘れた方",
  description:
    "登録済みのメールアドレスを入力してください。パスワードリセット用のリンクをメールでお送りします。",
  emailLabel: "メールアドレス",
  emailPlaceholder: "email@example.com",
  submitButton: "リセットメールを送信",
  submitting: "送信中...",
  successTitle: "メールを送信しました",
  successMessage: "{email} にパスワードリセット用のメールを送信しました。",
  successInstruction:
    "メール内のリンクをクリックして、新しいパスワードを設定してください。",
  checkSpamFolder:
    "メールが届かない場合は、迷惑メールフォルダもご確認ください。",
  emailRequired: "メールアドレスを入力してください",
  emailInvalid: "有効なメールアドレスを入力してください",
  errorMessage: "パスワードリセットメールの送信に失敗しました",
};

describe("ForgotPasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      resetPassword: mockResetPassword,
    });
    mockUseTranslations.mockReturnValue((key: string, values?: any) => {
      if (key === "successMessage" && values?.email) {
        return mockTranslations.successMessage.replace("{email}", values.email);
      }
      return mockTranslations[key as keyof typeof mockTranslations] || key;
    });
  });

  it("renders the form correctly", () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByText("パスワードを忘れた方")).toBeInTheDocument();
    expect(
      screen.getByText(
        "登録済みのメールアドレスを入力してください。パスワードリセット用のリンクをメールでお送りします。",
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("email@example.com"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "リセットメールを送信" }),
    ).toBeInTheDocument();
  });

  it("shows validation error for empty email", async () => {
    render(<ForgotPasswordForm />);

    const submitButton = screen.getByRole("button", {
      name: "リセットメールを送信",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("メールアドレスを入力してください"),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("email@example.com");
    const submitButton = screen.getByRole("button", {
      name: "リセットメールを送信",
    });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("有効なメールアドレスを入力してください"),
      ).toBeInTheDocument();
    });
  });

  it("calls resetPassword with correct email on valid submission", async () => {
    mockResetPassword.mockResolvedValue(undefined);

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("email@example.com");
    const submitButton = screen.getByRole("button", {
      name: "リセットメールを送信",
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("shows success message after successful submission", async () => {
    mockResetPassword.mockResolvedValue(undefined);

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("email@example.com");
    const submitButton = screen.getByRole("button", {
      name: "リセットメールを送信",
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("メールを送信しました")).toBeInTheDocument();
      expect(
        screen.getByText(
          "test@example.com にパスワードリセット用のメールを送信しました。",
        ),
      ).toBeInTheDocument();
    });
  });

  it("shows error message on failed submission", async () => {
    const errorMessage = "Network error";
    mockResetPassword.mockRejectedValue(new Error(errorMessage));

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("email@example.com");
    const submitButton = screen.getByRole("button", {
      name: "リセットメールを送信",
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("disables form during submission", async () => {
    mockResetPassword.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("email@example.com");
    const submitButton = screen.getByRole("button", {
      name: "リセットメールを送信",
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("送信中...")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(emailInput).toBeDisabled();
  });
});
