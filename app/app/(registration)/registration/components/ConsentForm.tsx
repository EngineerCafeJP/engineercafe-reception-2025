import { ErrorMessage } from "@hookform/error-message";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import type { MDXProps } from "mdx/types";

type ConsentFormProps = {
  methods: UseFormReturn<RegistrationSchema>;
};

const registrationTermsMap: Record<string, ComponentType<MDXProps>> = {
  ja: dynamic<MDXProps>(() =>
    import(
      "@/app/(registration)/registration/markdown/registration-terms/ja.mdx"
    ).then((mod) => mod.default),
  ),
  en: dynamic<MDXProps>(() =>
    import(
      "@/app/(registration)/registration/markdown/registration-terms/en.mdx"
    ).then((mod) => mod.default),
  ),
};

export default function ConsentForm({ methods }: ConsentFormProps) {
  // TODO: i18n適用後に修正が必要
  const RegistrationTerms = registrationTermsMap["ja"];

  return (
    <>
      <h1 className="text-center text-2xl font-extrabold sm:text-3xl">
        エンジニアカフェへようこそ
      </h1>
      <p className="text-center text-xl text-gray-400">新規会員登録</p>
      <div className="bg-base-100 border-base-300 my-6 rounded-lg border p-4">
        <div className="h-96 overflow-auto">
          <article className="prose prose-sm prose-h1:text-xl prose-h2:text-lg prose-h3:text-base">
            <RegistrationTerms />
          </article>
        </div>
      </div>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend">体調チェックの確認</legend>
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
          上記の症状がないことを確認しました
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
          個人情報の取扱いに関する同意
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
          上記の個人情報の利用目的に同意します
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
