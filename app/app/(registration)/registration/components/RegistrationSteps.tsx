import clsx from "clsx";

type RegistrationStepsProps = {
  currentStepIndex: number;
};

const stepNames = ["基本情報", "連絡先", "アンケート", "確認", "登録完了"];

export default function RegistrationSteps({
  currentStepIndex,
}: RegistrationStepsProps) {
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
