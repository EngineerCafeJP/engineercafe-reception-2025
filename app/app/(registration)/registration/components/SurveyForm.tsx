import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { FOUND_OTHER_ID } from "@/app/constants/founds";
import { Found } from "@/app/types";

type SurveyFormProps = {
  methods: UseFormReturn<RegistrationSchema>;
  founds?: Found[] | null;
};

export default function SurveyForm({ methods, founds }: SurveyFormProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-4 sm:grid-cols-4">
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label className="fieldset-label">
            エンジニアカフェをどこで知りましたか？
            <span className="ml-1 text-xs text-red-400">必須</span>
          </label>
          <div className="mt-3 space-y-4">
            {founds?.map((found) => (
              <div key={found.foundId} className="flex items-center gap-x-3">
                {found.foundId !== FOUND_OTHER_ID && (
                  <>
                    <input
                      {...methods.register("survey.foundId")}
                      className="radio"
                      id={`${methods.register("survey.foundId").name}-${found.foundId}`}
                      type="radio"
                      value={found.foundId}
                      onChange={(e) => {
                        methods.resetField("survey.foundOther");
                        methods.clearErrors("survey.foundOther");
                        methods.register("survey.foundId").onChange(e);
                      }}
                    />
                    <label
                      className="fieldset-label"
                      htmlFor={`${methods.register("survey.foundId").name}-${found.foundId}`}
                    >
                      {found.name}
                    </label>
                  </>
                )}
                {found.foundId === FOUND_OTHER_ID && (
                  <>
                    <input
                      {...methods.register("survey.foundId")}
                      className="radio"
                      id={`${methods.register("survey.foundId").name}-${found.foundId}`}
                      type="radio"
                      value={found.foundId}
                    />
                    <input
                      {...methods.register("survey.foundOther")}
                      autoComplete="off"
                      className={clsx("input input-sm w-full sm:w-1/2", {
                        "input-error":
                          methods.getFieldState("survey.foundOther").invalid,
                      })}
                      id={methods.register("survey.foundOther").name}
                      placeholder={found.name}
                      type="text"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("survey.foundId").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("survey.foundOther").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
    </div>
  );
}
