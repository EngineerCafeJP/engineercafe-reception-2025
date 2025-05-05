"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import ConsentForm from "@/app/(registration)/registration/components/ConsentForm";
import ContactForm from "@/app/(registration)/registration/components/ContactForm";
import NameAddressForm from "@/app/(registration)/registration/components/NameAddressForm";
import RegistrationComplete from "@/app/(registration)/registration/components/RegistrationComplete";
import RegistrationConfirmation from "@/app/(registration)/registration/components/RegistrationConfirmation";
import RegistrationSteps from "@/app/(registration)/registration/components/RegistrationSteps";
import SurveyForm from "@/app/(registration)/registration/components/SurveyForm";
import { useRegistrationOptions } from "@/app/(registration)/registration/hooks/use-registration-options";
import { useSubmitRegistration } from "@/app/(registration)/registration/hooks/use-submit-registration";
import { registrationSchema } from "@/app/(registration)/registration/schemas/registration-schema";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import MultiStepForm, {
  MultiStepFormStep,
} from "@/app/components/MultiStepForm";
import { useAddressSearch } from "@/app/hooks/use-address-search";

export default function Registration() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [createdUserId, setCreatedUserId] = useState<number>();
  const methods = useForm<RegistrationSchema>({
    resolver: standardSchemaResolver(registrationSchema),
  });
  const {
    isLoading: isRegistrationOptionsLoading,
    isError: isRegistrationOptionsError,
    prefectures,
    belongs,
    jobs,
    founds,
  } = useRegistrationOptions("ja");
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
            <h3 className="font-bold">エラーが発生しました</h3>
            <div className="text-xs">画面を更新して下さい。</div>
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

    const parse = registrationSchema.safeParse(methods.getValues());
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
          prefectures={prefectures}
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
              belongs={belongs}
              founds={founds}
              jobs={jobs}
              methods={methods}
              prefectures={prefectures}
              steps={steps}
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
