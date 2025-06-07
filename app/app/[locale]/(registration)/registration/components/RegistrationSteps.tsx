import clsx from "clsx";
import { useTranslations } from "next-intl";

type RegistrationStepsProps = {
  currentStepIndex: number;
};

export default function RegistrationSteps({
  currentStepIndex,
}: RegistrationStepsProps) {
  const t = useTranslations("RegistrationSteps");

  const stepNames = [
    t("basicInfo"),
    t("contact"),
    t("survey"),
    t("confirm"),
    t("complete"),
  ];

  if (currentStepIndex === 0) {
    return null;
  }

  return (
    <ul className="steps">
      {stepNames.map((stepName, index) => (
        <li
          key={`${stepName}-${index}`}
          className={clsx("step text-xs", {
            "step-primary": currentStepIndex >= index + 1,
          })}
        >
          {stepName}
        </li>
      ))}
    </ul>
  );
}
