import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "@/contexts/AuthContext";
import ResetPasswordForm from "./ResetPasswordForm";

// Mock dependencies
vi.mock("@/contexts/AuthContext");
vi.mock("next-intl");
vi.mock("next/navigation");

const mockUpdatePassword = vi.fn();
const mockPush = vi.fn();
const mockUseAuth = useAuth as any;
const mockUseTranslations = useTranslations as any;
const mockUseRouter = useRouter as any;

const mockTranslations = {
  title: "新しいパスワードを設定",
  description: "新しいパスワードを入力してください。",
  passwordLabel: "新しいパスワード",
  passwordPlaceholder: "新しいパスワード",
  confirmPasswordLabel: "確認パスワード",
  confirmPasswordPlaceholder: "確認パスワード",
  submitButton: "パスワードを更新",
  updating: "更新中...",
  successTitle: "パスワードを更新しました",
  successMessage:
    "パスワードが正常に更新されました。新しいパスワードでログインしてください。",
  backToSignIn: "ログインページに戻る",
  passwordRequirements: "パスワード要件:",
  requirementMinLength: "8文字以上",
  requirementLowercase: "小文字を含む",
  requirementUppercase: "大文字を含む",
  requirementNumber: "数字を含む",
  requirementSymbol: "記号を含む",
  passwordRequired: "パスワードを入力してください",
  passwordMinLength: "パスワードは8文字以上で入力してください",
  passwordComplexity:
    "パスワードは大文字、小文字、数字、記号を含む必要があります",
  confirmPasswordRequired: "確認パスワードを入力してください",
  passwordMismatch: "パスワードが一致しません",
  errorMessage: "パスワードの更新に失敗しました",
};

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      updatePassword: mockUpdatePassword,
    });
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
    mockUseTranslations.mockReturnValue((key: string) => {
      return mockTranslations[key as keyof typeof mockTranslations] || key;
    });
  });

  it("renders the form correctly", () => {
    render(<ResetPasswordForm />);

    expect(screen.getByText("新しいパスワードを設定")).toBeInTheDocument();
    expect(
      screen.getByText("新しいパスワードを入力してください。"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("新しいパスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("確認パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "パスワードを更新" }),
    ).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("パスワードは8文字以上で入力してください"),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for weak password", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "パスワードは大文字、小文字、数字、記号を含む必要があります",
        ),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for password mismatch", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText("確認パスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password456!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
    });
  });

  it("shows password requirements when typing", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    await waitFor(() => {
      expect(screen.getByText("パスワード要件:")).toBeInTheDocument();
      expect(screen.getByText("8文字以上")).toBeInTheDocument();
      expect(screen.getByText("小文字を含む")).toBeInTheDocument();
      expect(screen.getByText("大文字を含む")).toBeInTheDocument();
      expect(screen.getByText("数字を含む")).toBeInTheDocument();
      expect(screen.getByText("記号を含む")).toBeInTheDocument();
    });
  });

  it("calls updatePassword with correct password on valid submission", async () => {
    mockUpdatePassword.mockResolvedValue(undefined);

    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText("確認パスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith("Password123!");
    });
  });

  it("shows success message after successful submission", async () => {
    mockUpdatePassword.mockResolvedValue(undefined);

    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText("確認パスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("パスワードを更新しました")).toBeInTheDocument();
      expect(
        screen.getByText(
          "パスワードが正常に更新されました。新しいパスワードでログインしてください。",
        ),
      ).toBeInTheDocument();
    });
  });

  it("navigates to sign-in page when back button is clicked", async () => {
    mockUpdatePassword.mockResolvedValue(undefined);

    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText("確認パスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("パスワードを更新しました")).toBeInTheDocument();
    });

    const backButton = screen.getByRole("button", {
      name: "ログインページに戻る",
    });
    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });

  it("shows error message on failed submission", async () => {
    const errorMessage = "Network error";
    mockUpdatePassword.mockRejectedValue(new Error(errorMessage));

    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText("確認パスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("disables form during submission", async () => {
    mockUpdatePassword.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<ResetPasswordForm />);

    const passwordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText("確認パスワード");
    const submitButton = screen.getByRole("button", {
      name: "パスワードを更新",
    });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.click(submitButton);

    expect(screen.getByText("更新中...")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(confirmPasswordInput).toBeDisabled();
  });
});
