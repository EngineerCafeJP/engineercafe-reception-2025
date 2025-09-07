"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ResetPasswordForm from "./client-components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPassword");
  const { session, isInitialized } = useAuth();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    debugger;
    if (!isInitialized) return;

    // ハッシュフラグメントからパラメータを取得
    const hash = window.location.hash.substring(1); // #を除去
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    // パスワードリセット用のトークンかチェック
    if (type === "recovery" && accessToken && refreshToken) {
      setIsValidToken(true);
    } else if (session) {
      // セッションが存在する場合（Supabaseの認証状態変更で処理された場合）
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
  }, [isInitialized, session]);

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
