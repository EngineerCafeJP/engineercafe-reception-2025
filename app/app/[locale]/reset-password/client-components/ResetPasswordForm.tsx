"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

export type ResetPasswordFormProps = {
  onSuccess?: () => void;
};

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const t = useTranslations("ResetPassword");
  const { updatePassword } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, t("passwordMinLength"))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          t("passwordComplexity"),
        ),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    });

  type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await updatePassword(data.password);
      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    router.push("/sign-in");
  };

  if (isSuccess) {
    return (
      <div className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]">
        <div className="m-auto max-w-[420px] text-center">
          <h2 className="mb-6">{t("successTitle")}</h2>
          <div className="mb-6">
            <p className="text-sm text-gray-600">{t("successMessage")}</p>
          </div>
          <button
            className="btn btn-primary"
            data-testid="back-to-signin-button"
            onClick={handleBackToSignIn}
          >
            {t("backToSignIn")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="m-auto max-w-[420px]">
        <h2 className="mb-6 text-center">{t("title")}</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          {t("description")}
        </p>

        <div className="mb-[24px] w-full">
          <label className="mb-2 block">{t("passwordLabel")}</label>
          <input
            {...register("password")}
            className={`input w-full ${errors.password ? "input-error" : ""}`}
            data-testid="password-input"
            disabled={isLoading}
            placeholder={t("passwordPlaceholder")}
            type="password"
          />
          {errors.password && (
            <p className="text-error mt-1 text-sm">{errors.password.message}</p>
          )}
          {password && !errors.password && (
            <div className="mt-2">
              <div className="text-xs text-gray-500">
                <p>{t("passwordRequirements")}</p>
                <ul className="mt-1 list-inside list-disc">
                  <li
                    className={
                      password.length >= 8 ? "text-green-600" : "text-gray-400"
                    }
                  >
                    {t("requirementMinLength")}
                  </li>
                  <li
                    className={
                      /[a-z]/.test(password)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {t("requirementLowercase")}
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(password)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {t("requirementUppercase")}
                  </li>
                  <li
                    className={
                      /\d/.test(password) ? "text-green-600" : "text-gray-400"
                    }
                  >
                    {t("requirementNumber")}
                  </li>
                  <li
                    className={
                      /[@$!%*?&]/.test(password)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {t("requirementSymbol")}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mb-[24px] w-full">
          <label className="mb-2 block">{t("confirmPasswordLabel")}</label>
          <input
            {...register("confirmPassword")}
            className={`input w-full ${errors.confirmPassword ? "input-error" : ""}`}
            data-testid="confirm-password-input"
            disabled={isLoading}
            placeholder={t("confirmPasswordPlaceholder")}
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-error mt-1 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="text-right">
          <button
            className="btn btn-primary"
            data-testid="submit-button"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? t("updating") : t("submitButton")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
