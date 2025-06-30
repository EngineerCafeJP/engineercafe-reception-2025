"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Locale, useTranslations } from "next-intl";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import ConsentForm from "@/[locale]/(registration)/registration/components/ConsentForm";
import ContactForm from "@/[locale]/(registration)/registration/components/ContactForm";
import MultiStepForm, {
  MultiStepFormStep,
} from "@/[locale]/(registration)/registration/components/MultiStepForm";
import NameAddressForm from "@/[locale]/(registration)/registration/components/NameAddressForm";
import RegistrationComplete from "@/[locale]/(registration)/registration/components/RegistrationComplete";
import RegistrationConfirmation from "@/[locale]/(registration)/registration/components/RegistrationConfirmation";
import RegistrationSteps from "@/[locale]/(registration)/registration/components/RegistrationSteps";
import SurveyForm from "@/[locale]/(registration)/registration/components/SurveyForm";
import { useAddressSearch } from "@/[locale]/(registration)/registration/hooks/use-address-search";
import { useLatestRegistrationUserId } from "@/[locale]/(registration)/registration/hooks/use-latest-registration-userid";
import { useSubmitRegistration } from "@/[locale]/(registration)/registration/hooks/use-submit-registration";
import { registrationSchema } from "@/[locale]/(registration)/registration/schemas/registration-schema";
import { RegistrationSchema } from "@/[locale]/(registration)/registration/types";
import { useRegistrationOptions } from "@/hooks/use-registration-options";

export default function Registration({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("Registration");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [createdUserId, setCreatedUserId] = useState<number>();
  const methods = useForm<RegistrationSchema>({
    resolver: standardSchemaResolver(registrationSchema(t)),
  });
  const {
    isLoading: isRegistrationOptionsLoading,
    isError: isRegistrationOptionsError,
    stayCategories,
    prefectures,
    belongs,
    jobs,
    founds,
  } = useRegistrationOptions(locale);
  const {
    isPending: isCreateUserPending,
    isError: isCreateUserError,
    isSuccess: isCreateUserSuccess,
    insert,
  } = useSubmitRegistration({
    onSuccess: (userId) => {
      setCreatedUserId(userId);
      setCurrentStepIndex((prev) => prev + 1);
    },
  });
  const { isPending: isAddressSearchPending, searchAddress } =
    useAddressSearch();
  const { refetch: refetchLatestUserId } = useLatestRegistrationUserId();

  if (isRegistrationOptionsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl" />
      </div>
    );
  }

  if (isRegistrationOptionsError || isCreateUserError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div
          className="alert alert-vertical alert-error alert-soft sm:alert-horizontal mt-10"
          role="alert"
        >
          <MdErrorOutline size="1.5rem" />
          <div>
            <h3 className="font-bold">{t("errorTitle")}</h3>
            <div className="text-xs">{t("errorMessage")}</div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddressSearch = async (postalCode?: string) => {
    methods.clearErrors([
      "nameAddress.prefectureId",
      "nameAddress.prefectureOther",
      "nameAddress.city",
      "nameAddress.address",
    ]);
    methods.resetField("nameAddress.prefectureId");
    methods.resetField("nameAddress.prefectureOther");
    methods.resetField("nameAddress.city");
    methods.resetField("nameAddress.address");

    await searchAddress(postalCode, {
      onSuccess: (data) => {
        methods.setValue("nameAddress.prefectureId", data.prefcode);
        methods.setValue("nameAddress.city", data.address2);
        methods.setValue("nameAddress.address", data.address3);
      },
      onError: (error) => {
        methods.setError("nameAddress.postalCode", {
          message: error,
        });
      },
    });
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) {
      return;
    }

    const parse = registrationSchema(t).safeParse(methods.getValues());
    const error = parse.error?.issues.find(
      (issue) => issue.path[0] === steps[currentStepIndex].schemaName,
    );

    if (error) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setCurrentStepIndex(stepIndex);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const steps: MultiStepFormStep<ReturnType<typeof registrationSchema>>[] = [
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
          prefectures={prefectures}
          stayCategories={stayCategories}
          onAddressSearch={handleAddressSearch}
        />
      ),
    },
    {
      schemaName: "contact",
      children: <ContactForm belongs={belongs} jobs={jobs} methods={methods} />,
    },
    {
      schemaName: "survey",
      children: <SurveyForm founds={founds} methods={methods} />,
    },
  ];

  const handleSubmit = async (data: RegistrationSchema) => {
    await insert(data);
    const { data: latestUserId } = await refetchLatestUserId();

    if (latestUserId) {
      setCreatedUserId(latestUserId);
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <RegistrationSteps currentStepIndex={currentStepIndex} />
      </div>
      {currentStepIndex <= steps.length && (
        <MultiStepForm<ReturnType<typeof registrationSchema>>
          confirmationStep={
            <RegistrationConfirmation
              belongs={belongs}
              founds={founds}
              jobs={jobs}
              methods={methods}
              prefectures={prefectures}
              stayCategories={stayCategories}
              steps={steps}
              onStepChange={handleGoToStep}
            />
          }
          currentStepIndex={currentStepIndex}
          isLoading={isCreateUserPending}
          methods={methods}
          schema={registrationSchema(t)}
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
