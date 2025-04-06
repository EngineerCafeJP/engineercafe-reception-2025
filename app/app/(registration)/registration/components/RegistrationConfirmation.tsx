import { MdOutlineEdit } from "react-icons/md";

type FormValues = {
  name: {
    value: string;
    stepIndex: number;
  };
  pronunciation: {
    value: string;
    stepIndex: number;
  };
  address: {
    value: string;
    stepIndex: number;
  };
  phone: {
    value: string;
    stepIndex: number;
  };
  email: {
    value: string;
    stepIndex: number;
  };
  belong: {
    value: string;
    stepIndex: number;
  };
  belongDetail: {
    value?: string;
    stepIndex: number;
  };
  job: {
    value: string;
    stepIndex: number;
  };
  found: {
    value: string;
    stepIndex: number;
  };
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

const DEFINITION_TERMS: Record<keyof FormValues, string> = {
  name: "名前",
  pronunciation: "名前(ふりがな)",
  address: "住所",
  phone: "電話番号",
  email: "メールアドレス",
  belong: "所属",
  belongDetail: "所属詳細",
  job: "職種",
  found: "エンジニアカフェをどこで知りましたか？",
};

type RegistrationConfirmationProps = {
  formValues: FormValues;
  onStepChange: (stepIndex: number) => void;
};

export default function RegistrationConfirmation({
  formValues,
  onStepChange,
}: RegistrationConfirmationProps) {
  return (
    <div className="mt-5">
      <div className="text-xl font-bold">登録内容</div>
      <div className="mt-6">
        <dl>
          {labelKeys.map((key) => {
            const field = formValues[key];
            const definitionTerm = DEFINITION_TERMS[key];

            if (!field || !field.value === undefined) {
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
                  {field.value}
                  <button
                    className="btn btn-ghost btn-circle btn-sm ml-3"
                    onClick={() => onStepChange(field.stepIndex)}
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
