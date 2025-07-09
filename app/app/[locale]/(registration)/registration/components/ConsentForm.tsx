import { ErrorMessage } from "@hookform/error-message";
import dynamic from "next/dynamic";
import { Locale, useLocale, useTranslations } from "next-intl";
import { ComponentType } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/[locale]/(registration)/registration/types";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import type { MDXProps } from "mdx/types";

type ConsentFormProps = {
  methods: UseFormReturn<RegistrationSchema>;
};

const registrationTermsMap: Record<Locale, ComponentType<MDXProps>> = {
  ja: dynamic<MDXProps>(() =>
    import(
      "@/[locale]/(registration)/registration/markdown/registration-terms/ja.mdx"
    ).then((mod) => mod.default),
  ),
  en: dynamic<MDXProps>(() =>
    import(
      "@/[locale]/(registration)/registration/markdown/registration-terms/en.mdx"
    ).then((mod) => mod.default),
  ),
};

export default function ConsentForm({ methods }: ConsentFormProps) {
  const locale = useLocale();
  const t = useTranslations("ConsentForm");
  const RegistrationTerms = registrationTermsMap[locale];

  return (
    <>
      <div className="mb-2 ml-auto flex w-fit justify-end">
        <LocaleSwitcher />
      </div>
      <h1 className="text-center text-2xl font-extrabold sm:text-3xl">
        {t("title")}
      </h1>
      <p className="text-center text-xl text-gray-400">{t("subTitle")}</p>
      <div className="bg-base-100 border-base-300 my-6 rounded-lg border p-4">
        <div className="h-96 overflow-auto">
          <article className="prose prose-sm prose-h1:text-xl prose-h2:text-lg prose-h3:text-base">
            <RegistrationTerms />
          </article>
        </div>
      </div>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend">{t("healthCheck")}</legend>
        <label
          className="fieldset-label"
          htmlFor={methods.register("consent.health").name}
        >
          <input
            {...methods.register("consent.health")}
            className="checkbox validator mr-3"
            id={methods.register("consent.health").name}
            type="checkbox"
            required
          />
          {t("healthCheckLabel")}
        </label>
        <ErrorMessage
          errors={methods.formState.errors}
          name={methods.register("consent.health").name}
          render={({ message }) => (
            <span className="text-error text-xs">{message}</span>
          )}
        />
      </fieldset>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend">
          {t("personalInformationConsent")}
        </legend>
        <label
          className="fieldset-label"
          htmlFor={methods.register("consent.term").name}
        >
          <input
            {...methods.register("consent.term")}
            className="checkbox validator mr-3"
            id={methods.register("consent.term").name}
            type="checkbox"
            required
          />
          {t("personalInformationConsentLabel")}
        </label>
        <ErrorMessage
          errors={methods.formState.errors}
          name={methods.register("consent.term").name}
          render={({ message }) => (
            <span className="text-error text-xs">{message}</span>
          )}
        />
      </fieldset>
    </>
  );
}
