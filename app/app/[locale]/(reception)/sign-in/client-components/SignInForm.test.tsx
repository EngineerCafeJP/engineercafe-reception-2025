import { render, screen, fireEvent, act } from "@testing-library/react";
import SignInForm from "@/[locale]/(reception)/sign-in/client-components/SignInForm";

describe("SignInForm", () => {
  const mockSignIn = jest.fn();

  beforeEach(() => {
    mockSignIn.mockClear();
  });

  it("フォームが正しくレンダリングされること", () => {
    render(<SignInForm signIn={mockSignIn} />);

    expect(screen.getByText("管理者ログイン")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ログイン" }),
    ).toBeInTheDocument();
  });

  it("フォーム送信時に正しい値でsignIn関数が呼ばれること", async () => {
    render(<SignInForm signIn={mockSignIn} />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("login-button");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.submit(submitButton);
    });

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
    expect(mockSignIn).toHaveBeenCalledTimes(1);
  });
});
