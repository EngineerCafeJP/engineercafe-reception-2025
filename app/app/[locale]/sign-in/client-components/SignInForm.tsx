"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export type SignInFormProps = {
  signIn: (email: string, password: string) => Promise<void>;
};

const SignInForm: React.FC<SignInFormProps> = ({ signIn }) => {
  const t = useTranslations("SignIn");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn(email, password);
  };

  return (
    <form
      className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]"
      onSubmit={handleSubmit}
    >
      <div className="m-auto max-w-[420px]">
        <h2 className="text-center">管理者ログイン</h2>
        <div className="mb-[24px] w-full">
          <label className="block">メールアドレス</label>
          <input
            className="input w-full"
            data-testid="email-input"
            name="email"
            placeholder="email"
            type="email"
          />
        </div>
        <div className="mb-[24px] w-full">
          <label className="block">パスワード</label>
          <input
            className="input w-full"
            data-testid="password-input"
            name="password"
            placeholder="password"
            type="password"
          />
        </div>
        <div className="mb-4 text-right">
          <button
            className="btn btn-primary mx-auto"
            data-testid="login-button"
            type="submit"
          >
            ログイン
          </button>
        </div>
        <div className="text-center">
          <Link
            className="text-sm text-blue-600 underline hover:text-blue-800"
            data-testid="forgot-password-link"
            href="/forgot-password"
          >
            {t("forgotPasswordLink")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
