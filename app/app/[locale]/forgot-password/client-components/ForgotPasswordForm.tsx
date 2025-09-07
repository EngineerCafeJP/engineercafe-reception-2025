"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

export type ForgotPasswordFormProps = {
  onSuccess?: () => void;
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccess,
}) => {
  const t = useTranslations("ForgotPassword");
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPasswordSchema = z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
  });

  type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await resetPassword(data.email);
      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]">
        <div className="m-auto max-w-[420px] text-center">
          <h2 className="mb-6">{t("successTitle")}</h2>
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {t("successMessage", { email: getValues("email") })}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {t("successInstruction")}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>{t("checkSpamFolder")}</p>
          </div>
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
          <label className="mb-2 block">{t("emailLabel")}</label>
          <input
            {...register("email")}
            className={`input w-full ${errors.email ? "input-error" : ""}`}
            data-testid="email-input"
            disabled={isLoading}
            placeholder={t("emailPlaceholder")}
            type="email"
          />
          {errors.email && (
            <p className="text-error mt-1 text-sm">{errors.email.message}</p>
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
            {isLoading ? t("submitting") : t("submitButton")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
