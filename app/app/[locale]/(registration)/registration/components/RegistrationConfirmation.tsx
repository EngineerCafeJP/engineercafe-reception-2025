import { Messages, useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { z } from "zod";
import { MultiStepFormStep } from "@/[locale]/(registration)/registration/components/MultiStepForm";
import { RegistrationSchema } from "@/[locale]/(registration)/registration/types";
import { BELONG_OTHER_ID } from "@/constants/belongs";
import { FOUND_OTHER_ID } from "@/constants/founds";
import { JOB_OTHER_ID } from "@/constants/jobs";
import { PREFECTURE_OTHER_ID } from "@/constants/prefectures";
import { Belong, Found, Job, Prefecture } from "@/types";

type FormValues = {
  name: string;
  pronunciation: string;
  address: string;
  phone: string;
  email: string;
  belong: string;
  belongDetail?: string;
  job: string;
  found: string;
};

const labelKeys = [
  "name",
  "pronunciation",
  "address",
  "phone",
  "email",
  "belong",
  "belongDetail",
  "job",
  "found",
] satisfies (keyof FormValues)[];

const DEFINITION_TERMS: Record<
  keyof FormValues,
  keyof Messages["RegistrationConfirmation"]
> = {
  name: "name",
  pronunciation: "pronunciation",
  address: "address",
  phone: "phone",
  email: "email",
  belong: "belong",
  belongDetail: "belongDetail",
  job: "job",
  found: "found",
};

type RegistrationConfirmationProps<T extends z.ZodType> = {
  methods: UseFormReturn<RegistrationSchema>;
  steps: MultiStepFormStep<T>[];
  prefectures: Prefecture[] | null;
  belongs: Belong[] | null;
  jobs: Job[] | null;
  founds: Found[] | null;
  onStepChange: (stepIndex: number) => void;
};

export default function RegistrationConfirmation<T extends z.ZodType>({
  methods,
  steps,
  prefectures,
  belongs,
  jobs,
  founds,
  onStepChange,
}: RegistrationConfirmationProps<T>) {
  const t = useTranslations("RegistrationConfirmation");

  const stepMapping: { [K in keyof FormValues]: number } = {
    name: steps.findIndex((step) => step.schemaName === "nameAddress"),
    pronunciation: steps.findIndex((step) => step.schemaName === "nameAddress"),
    address: steps.findIndex((step) => step.schemaName === "nameAddress"),
    phone: steps.findIndex((step) => step.schemaName === "contact"),
    email: steps.findIndex((step) => step.schemaName === "contact"),
    belong: steps.findIndex((step) => step.schemaName === "contact"),
    belongDetail: steps.findIndex((step) => step.schemaName === "contact"),
    job: steps.findIndex((step) => step.schemaName === "contact"),
    found: steps.findIndex((step) => step.schemaName === "survey"),
  };

  const formValues: FormValues = {
    name: methods.getValues("nameAddress.name"),
    pronunciation: methods.getValues("nameAddress.pronunciation"),
    address: getAddressFromFormValue(methods, prefectures) || "",
    phone: methods.getValues("contact.phone"),
    email: methods.getValues("contact.email"),
    belong: getBelongFromFormValue(methods, belongs) || "",
    belongDetail: methods.getValues("contact.belongDetail"),
    job: getJobFromFormValue(methods, jobs) || "",
    found: getFoundFromFormValue(methods, founds) || "",
  };

  return (
    <div className="mt-5">
      <div className="text-xl font-bold">{t("title")}</div>
      <div className="mt-6">
        <dl>
          {labelKeys.map((key) => {
            const value = formValues[key];
            const definitionTerm = t(DEFINITION_TERMS[key]);
            const stepIndex = stepMapping[key];

            if (value === undefined) {
              return null;
            }

            return (
              <div
                key={key}
                className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              >
                <dt className="text-base-content/60 text-xs font-semibold">
                  {definitionTerm}
                </dt>
                <dd className="mt-1 text-lg font-bold sm:col-span-2 sm:mt-0">
                  {value}
                  <button
                    className="btn btn-ghost btn-circle btn-sm ml-3"
                    onClick={() => {
                      if (stepIndex) {
                        onStepChange(stepIndex);
                      }
                    }}
                  >
                    <MdOutlineEdit className="text-base-content/60" />
                  </button>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

function getAddressFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  prefectures: Prefecture[] | null,
) {
  if (
    Number(methods.getValues("nameAddress.prefectureId")) ===
    PREFECTURE_OTHER_ID
  ) {
    return methods.getValues("nameAddress.prefectureOther");
  }

  return `${
    prefectures?.find(
      (prefecture) =>
        prefecture.prefectureId ===
        Number(methods.getValues("nameAddress.prefectureId")),
    )?.name
  }${methods.getValues("nameAddress.city")}${methods.getValues("nameAddress.address")}`;
}

function getBelongFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  belongs: Belong[] | null,
) {
  if (Number(methods.getValues("contact.belongId")) === BELONG_OTHER_ID) {
    return methods.getValues("contact.belongOther");
  }

  return belongs?.find(
    (belong) =>
      belong.belongId === Number(methods.getValues("contact.belongId")),
  )?.name;
}

function getFoundFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  founds: Found[] | null,
) {
  if (Number(methods.getValues("survey.foundId")) === FOUND_OTHER_ID) {
    return methods.getValues("survey.foundOther");
  }

  return founds?.find(
    (found) => found.foundId === Number(methods.getValues("survey.foundId")),
  )?.name;
}

function getJobFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  jobs: Job[] | null,
) {
  if (Number(methods.getValues("contact.jobId")) === JOB_OTHER_ID) {
    return methods.getValues("contact.jobOther");
  }

  return jobs?.find(
    (job) => job.jobId === Number(methods.getValues("contact.jobId")),
  )?.name;
}
