"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ResetPasswordForm from "./client-components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPassword");
  const { session } = useAuth();
  const searchParams = useSearchParams();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    // URLパラメータからトークンを取得
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const type = searchParams.get("type");

    // パスワードリセット用のトークンかチェック
    if (type === "recovery" && accessToken && refreshToken) {
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
  }, [searchParams]);

  if (session) {
    redirect("/");
  }

  if (isValidToken === null) {
    return (
      <div className="container mx-auto mt-[8rem]">
        <div className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]">
          <div className="m-auto max-w-[420px] text-center">
            <h2 className="mb-6">{t("verifying")}</h2>
            <p className="text-sm text-gray-600">{t("verifyingMessage")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    return (
      <div className="container mx-auto mt-[8rem]">
        <div className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]">
          <div className="m-auto max-w-[420px] text-center">
            <h2 className="mb-6">{t("invalidTokenTitle")}</h2>
            <p className="mb-6 text-sm text-gray-600">
              {t("invalidTokenMessage")}
            </p>
            <Link
              className="btn btn-primary"
              data-testid="back-to-forgot-password-button"
              href="/forgot-password"
            >
              {t("backToForgotPassword")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-[8rem]">
      <ResetPasswordForm />
    </div>
  );
}
