import { ErrorMessage } from "@hookform/error-message";
import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import Terms from "@/markdown/terms.mdx";

type ConsentFormProps = {
  methods: UseFormReturn<RegistrationSchema>;
};

export default function ConsentForm({ methods }: ConsentFormProps) {
  return (
    <>
      <h1 className="text-center text-2xl font-bold sm:text-3xl">
        エンジニアカフェへようこそ
      </h1>
      <p className="text-center text-xl text-gray-400">新規会員登録</p>
      <div className="bg-base-100 border-base-300 my-6 rounded-lg border p-4">
        <div className="h-90 overflow-auto">
          <Terms />
        </div>
      </div>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
        <legend className="fieldset-legend">体調について</legend>
        <label
          className="fieldset-label"
          htmlFor={methods.register("consent.health").name}
        >
          <input
            {...methods.register("consent.health")}
            className="checkbox validator"
            id={methods.register("consent.health").name}
            type="checkbox"
            required
          />
          体調不良は無く、健康です。
        </label>
        <ErrorMessage
          errors={methods.formState.errors}
          name={methods.register("consent.health").name}
          render={({ message }) => (
            <span className="text-error text-xs">{message}</span>
          )}
        />
      </fieldset>
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
        <legend className="fieldset-legend">個人情報の利用目的について</legend>
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
          同意します。
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
