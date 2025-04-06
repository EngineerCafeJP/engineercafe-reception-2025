"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  useInsertMutation,
  useQuery,
} from "@supabase-cache-helpers/postgrest-react-query";
import camelcaseKeys from "camelcase-keys";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import ConsentForm from "@/app/(registration)/registration/components/ConsentForm";
import ContactForm from "@/app/(registration)/registration/components/ContactForm";
import NameAddressForm from "@/app/(registration)/registration/components/NameAddressForm";
import RegistrationComplete from "@/app/(registration)/registration/components/RegistrationComplete";
import RegistrationConfirmation from "@/app/(registration)/registration/components/RegistrationConfirmation";
import RegistrationSteps from "@/app/(registration)/registration/components/RegistrationSteps";
import SurveyForm from "@/app/(registration)/registration/components/SurveyForm";
import { registrationSchema } from "@/app/(registration)/registration/schemas/registration-schema";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { getAddressFromFormValue } from "@/app/(registration)/registration/utils/get-address-from-form-value";
import { getBelongFromFormValue } from "@/app/(registration)/registration/utils/get-belong-from-form-value";
import { getFoundFromFormValue } from "@/app/(registration)/registration/utils/get-found-from-form-value";
import { getJobFromFormValue } from "@/app/(registration)/registration/utils/get-job-from-form-value";
import MultiStepForm, {
  MultiStepFormStep,
} from "@/app/components/MultiStepForm";
import { ZIPCLOUD_API_URL } from "@/app/constants/zipcloud";
import { fetchBelongTranslationsByLocale } from "@/app/queries/belong-translations-queries";
import { fetchFoundTranslationsByLocale } from "@/app/queries/found-translations-queries";
import { fetchJobTranslationsByLocale } from "@/app/queries/job-translations-queries";
import { fetchPrefectureTranslationsByLocale } from "@/app/queries/prefecture-translations-queries";
import { ZipcloudResponse } from "@/app/types";
import supabase from "@/utils/supabase/client";

export default function Registration() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [createdUserId, setCreatedUserId] = useState<number>();
  const [isAddressSearchPending, startTransitionAddressSearch] =
    useTransition();
  const {
    isPending: isFetchPrefecturesPending,
    isError: isFetchPrefecturesError,
    data: prefectures,
  } = useQuery(fetchPrefectureTranslationsByLocale(supabase, "ja"));
  const {
    isPending: isFetchBelongsPending,
    isError: isFetchBelongsError,
    data: belongs,
  } = useQuery(fetchBelongTranslationsByLocale(supabase, "ja"));
  const {
    isPending: isFetchJobsPending,
    isError: isFetchJobsError,
    data: jobs,
  } = useQuery(fetchJobTranslationsByLocale(supabase, "ja"));
  const {
    isPending: isFetchFoundsPending,
    isError: isFetchFoundsError,
    data: founds,
  } = useQuery(fetchFoundTranslationsByLocale(supabase, "ja"));
  const {
    isPending: isCreateUserPending,
    isError: isCreateUserError,
    isSuccess: isCreateUserSuccess,
    mutateAsync: insert,
  } = useInsertMutation(
    // Use `any` type until the following issue is fixed.
    // https://github.com/psteinroe/supabase-cache-helpers/issues/557
    // TODO: Need to be fixed after the issue is resolved.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.from("users") as any,
    ["id"],
    "id",
    {
      onSuccess: (data) => {
        if (!data) {
          return;
        }

        setCreatedUserId(data[0].id);
        setCurrentStepIndex((prev) => prev + 1);
      },
    },
  );
  const methods = useForm<RegistrationSchema>({
    resolver: standardSchemaResolver(registrationSchema),
  });

  if (
    isFetchPrefecturesPending ||
    isFetchBelongsPending ||
    isFetchJobsPending ||
    isFetchFoundsPending
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl" />
      </div>
    );
  }

  if (
    isFetchPrefecturesError ||
    isFetchBelongsError ||
    isFetchJobsError ||
    isFetchFoundsError ||
    isCreateUserError
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          className="alert alert-vertical alert-error alert-soft sm:alert-horizontal mt-10"
          role="alert"
        >
          <MdErrorOutline size="1.5rem" />
          <div>
            <h3 className="font-bold">エラーが発生しました</h3>
            <div className="text-xs">画面を更新して下さい。</div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddressSerch = (postalCode?: string) => {
    startTransitionAddressSearch(async () => {
      methods.clearErrors([
        "nameAddress.prefectureId",
        "nameAddress.prefectureOther",
        "nameAddress.city",
        "nameAddress.address",
      ]);
      methods.setValue("nameAddress.prefectureId", "");
      methods.setValue("nameAddress.prefectureOther", "");
      methods.setValue("nameAddress.city", "");
      methods.setValue("nameAddress.address", "");

      try {
        const res = await fetch(`${ZIPCLOUD_API_URL}?zipcode=${postalCode}`);
        const data: ZipcloudResponse = await res.json();

        if (data.status !== 200 || data.results === null) {
          methods.setError("nameAddress.postalCode", {
            message: data.message ?? "エラーが発生しました。",
          });
        } else {
          methods.setValue(
            "nameAddress.prefectureId",
            data.results[0].prefcode,
          );
          methods.setValue("nameAddress.city", data.results[0].address2);
          methods.setValue("nameAddress.address", data.results[0].address3);
        }
      } catch {
        methods.setError("nameAddress.postalCode", {
          message: "エラーが発生しました。",
        });
      }
    });
  };

  const handleGoToStep = (stepIndex: number) => {
    const parse = registrationSchema.safeParse(methods.getValues());
    const error = parse.error?.issues.find(
      (issue) => issue.path[0] === steps[currentStepIndex].schemaName,
    );

    if (stepIndex >= 0 && stepIndex < steps.length && !error) {
      setCurrentStepIndex(stepIndex);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const steps: MultiStepFormStep<typeof registrationSchema>[] = [
    {
      schemaName: "consent",
      children: <ConsentForm methods={methods} />,
    },
    {
      schemaName: "nameAddress",
      children: (
        <NameAddressForm
          isPendingSearchAddress={isAddressSearchPending}
          methods={methods}
          prefectures={prefectures ? camelcaseKeys(prefectures) : null}
          onAddressSerch={handleAddressSerch}
        />
      ),
    },
    {
      schemaName: "contact",
      children: (
        <ContactForm
          belongs={belongs ? camelcaseKeys(belongs) : null}
          jobs={jobs ? camelcaseKeys(jobs) : null}
          methods={methods}
        />
      ),
    },
    {
      schemaName: "survey",
      children: (
        <SurveyForm
          founds={founds ? camelcaseKeys(founds) : null}
          methods={methods}
        />
      ),
    },
  ];

  const handleSubmit = async (data: RegistrationSchema) => {
    const { nameAddress, contact, survey } = data;

    await insert({
      name: nameAddress.name,
      pronunciation: nameAddress.pronunciation,
      email: contact.email,
      phone: contact.phone,
      prefecture_id: Number(nameAddress.prefectureId),
      prefecture_other: nameAddress.prefectureOther,
      city: nameAddress.city,
      address: nameAddress.address,
      belong_id: Number(contact.belongId),
      belong_other: contact.belongOther,
      belong_detail: contact.belongDetail,
      job_id: Number(contact.jobId),
      job_other: contact.jobOther,
      found_id: Number(survey.foundId),
      found_other: survey.foundOther,
      // Use `any` type until the following issue is fixed.
      // https://github.com/psteinroe/supabase-cache-helpers/issues/557
      // TODO: Need to be fixed after the issue is resolved.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return (
    <>
      <div className="flex justify-center">
        <RegistrationSteps currentStepIndex={currentStepIndex} />
      </div>
      {currentStepIndex <= steps.length && (
        <MultiStepForm<typeof registrationSchema>
          confirmationStep={
            <RegistrationConfirmation
              formValues={{
                name: {
                  value: methods.getValues("nameAddress.name"),
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "nameAddress",
                  ),
                },
                pronunciation: {
                  value: methods.getValues("nameAddress.pronunciation"),
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "nameAddress",
                  ),
                },
                address: {
                  value:
                    getAddressFromFormValue(
                      methods,
                      prefectures ? camelcaseKeys(prefectures) : null,
                    ) || "",
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "nameAddress",
                  ),
                },
                phone: {
                  value: methods.getValues("contact.phone"),
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "contact",
                  ),
                },
                email: {
                  value: methods.getValues("contact.email"),
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "contact",
                  ),
                },
                belong: {
                  value:
                    getBelongFromFormValue(
                      methods,
                      belongs ? camelcaseKeys(belongs) : null,
                    ) || "",
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "contact",
                  ),
                },
                belongDetail: {
                  value: methods.getValues("contact.belongDetail"),
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "contact",
                  ),
                },
                job: {
                  value:
                    getJobFromFormValue(
                      methods,
                      jobs ? camelcaseKeys(jobs) : null,
                    ) || "",
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "contact",
                  ),
                },
                found: {
                  value:
                    getFoundFromFormValue(
                      methods,
                      founds ? camelcaseKeys(founds) : null,
                    ) || "",
                  stepIndex: steps.findIndex(
                    (step) => step.schemaName === "survey",
                  ),
                },
              }}
              onStepChange={handleGoToStep}
            />
          }
          currentStepIndex={currentStepIndex}
          isLoading={isCreateUserPending}
          methods={methods}
          schema={registrationSchema}
          steps={steps}
          onChangeStep={setCurrentStepIndex}
          onSubmit={handleSubmit}
        />
      )}
      {isCreateUserSuccess && createdUserId !== undefined && (
        <RegistrationComplete createdUserId={createdUserId} />
      )}
    </>
  );
}
