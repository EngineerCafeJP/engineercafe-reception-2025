import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { z, ZodObject } from "zod";

export type MultiStepFormStep<T extends z.ZodType> = {
  schemaName: keyof z.infer<T>;
  children: ReactNode;
};

type MultiStepFormProps<T extends z.ZodType> = {
  confirmationStep?: ReactNode;
  currentStepIndex: number;
  isLoading: boolean;
  methods: UseFormReturn<z.infer<T>>;
  schema: T;
  steps: MultiStepFormStep<T>[];
  onChangeStep: (step: number) => void;
  onSubmit: (data: z.infer<T>) => void;
};

export default function MultiStepForm<T extends z.ZodType>({
  confirmationStep,
  currentStepIndex,
  isLoading,
  methods,
  schema,
  steps,
  onChangeStep,
  onSubmit,
}: MultiStepFormProps<T>) {
  const t = useTranslations("MultiStepForm");

  if (!(schema instanceof ZodObject)) {
    throw new Error(`Unsupported schema type: ${schema.constructor.name}.`);
  }

  const schemaKeys: string[] = schema.keyof()._def.values;

  if (schemaKeys.length !== steps.length) {
    throw new Error("Amount of steps and fields in schema do not match");
  }

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isConfirmationStep = currentStepIndex === steps.length;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isStepValid = () => {
    const parse = schema.safeParse(methods.getValues());
    const error = parse.error?.issues.find(
      (issue) => issue.path[0] === steps[currentStepIndex].schemaName,
    );

    if (error) {
      return false;
    } else {
      return true;
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;

      onChangeStep(newStep);
    }

    scrollToTop();
  };

  const handleNext = () => {
    const newStep = currentStepIndex + 1;

    if (confirmationStep) {
      if (!isLastStep && !isConfirmationStep && isStepValid()) {
        onChangeStep(newStep);
      } else if (isLastStep && isStepValid()) {
        onChangeStep(newStep);
      } else {
        methods.handleSubmit(onSubmit)();
      }
    } else {
      if (!isLastStep && isStepValid()) {
        onChangeStep(newStep);
      } else {
        methods.handleSubmit(onSubmit)();
      }
    }

    scrollToTop();
  };

  return (
    <div className="w-full">
      {steps.map(
        (step, index) =>
          index === currentStepIndex && <div key={index}>{step.children}</div>,
      )}
      {isConfirmationStep && confirmationStep}
      <div className="mt-10 flex justify-between">
        {!isFirstStep && (
          <button className="btn" onClick={handleBack}>
            {t("back")}
          </button>
        )}
        <button className="btn btn-primary" onClick={handleNext}>
          {isLoading && <span className="loading loading-spinner" />}
          {(confirmationStep ? isConfirmationStep : isLastStep)
            ? t("submit")
            : t("next")}
        </button>
      </div>
    </div>
  );
}
