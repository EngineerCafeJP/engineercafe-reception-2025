import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/[locale]/(registration)/registration/types";
import { BELONG_OTHER_ID } from "@/constants/belongs";
import { JOB_OTHER_ID } from "@/constants/jobs";
import { Belong, Job } from "@/types";

type ContactFormProps = {
  methods: UseFormReturn<RegistrationSchema>;
  belongs?: Belong[] | null;
  jobs?: Job[] | null;
};

export default function ContactForm({
  methods,
  belongs,
  jobs,
}: ContactFormProps) {
  const t = useTranslations("ContactForm");
  const jobId = methods.watch("contact.jobId");

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-4 sm:grid-cols-4">
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label
            className="fieldset-label"
            htmlFor={methods.register("contact.phone").name}
          >
            {t("phone")}
            <span className="ml-1 text-xs text-red-400">{t("required")}</span>
          </label>
          <input
            {...methods.register("contact.phone")}
            autoComplete="tel"
            className={clsx("input w-full sm:w-1/2", {
              "input-error": methods.getFieldState("contact.phone").invalid,
            })}
            id={methods.register("contact.phone").name}
            type="tel"
            required
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("contact.phone").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label
            className="fieldset-label"
            htmlFor={methods.register("contact.email").name}
          >
            {t("email")}
            <span className="ml-1 text-xs text-red-400">{t("required")}</span>
          </label>
          <input
            {...methods.register("contact.email")}
            autoComplete="email"
            className={clsx("input w-full sm:w-2/3", {
              "input-error": methods.getFieldState("contact.email").invalid,
            })}
            id={methods.register("contact.email").name}
            type="email"
            required
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("contact.email").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label className="fieldset-label">
            {t("belong")}
            <span className="ml-1 text-xs text-red-400">{t("required")}</span>
          </label>
          <div className="mt-3 space-y-4">
            {belongs?.map((belong) => (
              <div key={belong.belongId} className="flex items-center gap-x-3">
                {belong.belongId !== BELONG_OTHER_ID && (
                  <>
                    <input
                      {...methods.register("contact.belongId")}
                      className="radio"
                      id={`${methods.register("contact.belongId").name}-${belong.belongId}`}
                      type="radio"
                      value={belong.belongId}
                      onChange={(e) => {
                        methods.register("contact.belongId").onChange(e);

                        methods.resetField("contact.belongOther");
                      }}
                    />
                    <label
                      className="fieldset-label"
                      htmlFor={`${methods.register("contact.belongId").name}-${belong.belongId}`}
                    >
                      {belong.name}
                    </label>
                  </>
                )}
                {belong.belongId === BELONG_OTHER_ID && (
                  <>
                    <input
                      {...methods.register("contact.belongId")}
                      className="radio"
                      id={`${methods.register("contact.belongId").name}-${belong.belongId}`}
                      type="radio"
                      value={belong.belongId}
                    />
                    <input
                      {...methods.register("contact.belongOther")}
                      autoComplete="off"
                      className={clsx("input input-sm w-full sm:w-1/2", {
                        "input-error": methods.getFieldState(
                          "contact.belongOther",
                        ).invalid,
                      })}
                      id={methods.register("contact.belongOther").name}
                      placeholder={belong.name}
                      type="text"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("contact.belongId").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("contact.belongOther").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label
            className="fieldset-label"
            htmlFor={methods.register("contact.belongDetail").name}
          >
            {t("belongDetail")}
          </label>
          <span className="text-xs">{t("belongDetailDescription")}</span>
          <input
            {...methods.register("contact.belongDetail")}
            autoComplete="off"
            className={clsx("input w-full sm:w-2/3", {
              "input-error": methods.getFieldState("contact.belongDetail")
                .invalid,
            })}
            id={methods.register("contact.belongDetail").name}
            type="text"
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("contact.belongDetail").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label
            className="fieldset-label"
            htmlFor={methods.register("contact.jobId").name}
          >
            {t("job")}
            <span className="ml-1 text-xs text-red-400">{t("required")}</span>
          </label>
          <select
            {...methods.register("contact.jobId")}
            autoComplete="off"
            className={clsx("select w-full sm:w-1/2", {
              "input-error": methods.getFieldState("contact.jobId").invalid,
            })}
            defaultValue=""
            id={methods.register("contact.jobId").name}
          >
            <option value="" disabled>
              {t("selectJob")}
            </option>
            {jobs?.map((job) => (
              <option key={job.jobId} value={job.jobId}>
                {job.name}
              </option>
            ))}
          </select>
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("contact.jobId").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
      {Number(jobId) === JOB_OTHER_ID && (
        <div className="sm:col-span-full">
          <fieldset className="fieldset">
            <label
              className="fieldset-label"
              htmlFor={methods.register("contact.jobOther").name}
            >
              {t("jobOther")}
              <span className="ml-1 text-xs text-red-400">{t("required")}</span>
            </label>
            <input
              {...methods.register("contact.jobOther")}
              autoComplete="off"
              className={clsx("input w-full sm:w-2/3", {
                "input-error":
                  methods.getFieldState("contact.jobOther").invalid,
              })}
              id={methods.register("contact.jobOther").name}
              type="text"
            />
            <ErrorMessage
              errors={methods.formState.errors}
              name={methods.register("contact.jobOther").name}
              render={({ message }) => (
                <span className="text-error text-xs">{message}</span>
              )}
            />
          </fieldset>
        </div>
      )}
    </div>
  );
}
