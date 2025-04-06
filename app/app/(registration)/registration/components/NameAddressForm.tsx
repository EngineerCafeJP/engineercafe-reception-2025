import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { PREFECTURE_OTHER_ID } from "@/app/constants/prefectures";
import { Prefecture } from "@/app/types";

type NameAddressFormProps = {
  methods: UseFormReturn<RegistrationSchema>;
  prefectures?: Prefecture[] | null;
  isPendingSearchAddress: boolean;
  onAddressSerch: (postalCode?: string) => void;
};

export default function NameAddressForm({
  methods,
  prefectures,
  isPendingSearchAddress,
  onAddressSerch,
}: NameAddressFormProps) {
  const prefectureId = methods.watch("nameAddress.prefectureId");

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-4 sm:grid-cols-4">
      <div className="sm:col-span-full">
        <fieldset className="fieldset">
          <label
            className="fieldset-label"
            htmlFor={methods.register("nameAddress.name").name}
          >
            氏名<span className="ml-1 text-xs text-red-400">必須</span>
          </label>
          <input
            {...methods.register("nameAddress.name")}
            autoComplete="name"
            className={clsx("input w-full sm:w-2/3", {
              "input-error": methods.getFieldState("nameAddress.name").invalid,
            })}
            id={methods.register("nameAddress.name").name}
            type="text"
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("nameAddress.name").name}
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
            htmlFor={methods.register("nameAddress.pronunciation").name}
          >
            氏名（ふりがな）
            <span className="ml-1 text-xs text-red-400">必須</span>
          </label>
          <input
            {...methods.register("nameAddress.pronunciation")}
            autoComplete="off"
            className={clsx("input w-full sm:w-2/3", {
              "input-error": methods.getFieldState("nameAddress.pronunciation")
                .invalid,
            })}
            id={methods.register("nameAddress.pronunciation").name}
            type="text"
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("nameAddress.pronunciation").name}
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
            htmlFor={methods.register("nameAddress.postalCode").name}
          >
            郵便番号
          </label>
          <div className="flex items-center gap-x-3">
            <input
              {...methods.register("nameAddress.postalCode")}
              autoComplete="postal-code"
              className="input w-full sm:w-1/3"
              id={methods.register("nameAddress.postalCode").name}
              inputMode="numeric"
              type="text"
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                onAddressSerch(methods.getValues("nameAddress.postalCode"));
              }}
            >
              {isPendingSearchAddress && (
                <span className="loading loading-spinner" />
              )}
              住所自動入力
            </button>
          </div>
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("nameAddress.postalCode").name}
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
            htmlFor={methods.register("nameAddress.prefectureId").name}
          >
            都道府県
            <span className="ml-1 text-xs text-red-400">必須</span>
          </label>
          <select
            {...methods.register("nameAddress.prefectureId")}
            autoComplete="address-level1"
            className={clsx("select w-full sm:w-1/3", {
              "input-error": methods.getFieldState("nameAddress.prefectureId")
                .invalid,
            })}
            defaultValue=""
            id={methods.register("nameAddress.prefectureId").name}
            onChange={(e) => {
              const value = e.target.value;

              methods.register("nameAddress.prefectureId").onChange(e);

              if (Number(value) === PREFECTURE_OTHER_ID) {
                methods.setValue("nameAddress.city", "");
                methods.setValue("nameAddress.address", "");
              }
            }}
          >
            <option value="" disabled>
              都道府県を選択
            </option>
            {prefectures?.map((prefecture) => (
              <option
                key={prefecture.prefectureId}
                value={prefecture.prefectureId}
              >
                {prefecture.name}
              </option>
            ))}
          </select>
          <ErrorMessage
            errors={methods.formState.errors}
            name={methods.register("nameAddress.prefectureId").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
      </div>
      {Number(prefectureId) !== PREFECTURE_OTHER_ID && (
        <>
          <div className="sm:col-span-full">
            <fieldset className="fieldset">
              <label
                className="fieldset-label"
                htmlFor={methods.register("nameAddress.city").name}
              >
                市区町村
                <span className="ml-1 text-xs text-red-400">必須</span>
              </label>
              <input
                {...methods.register("nameAddress.city")}
                autoComplete="address-level2"
                className={clsx("input w-full sm:w-2/3", {
                  "input-error":
                    methods.getFieldState("nameAddress.city").invalid,
                })}
                id={methods.register("nameAddress.city").name}
                type="text"
              />
              <ErrorMessage
                errors={methods.formState.errors}
                name={methods.register("nameAddress.city").name}
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
                htmlFor={methods.register("nameAddress.address").name}
              >
                丁目
                <span className="ml-1 text-xs text-red-400">必須</span>
              </label>
              <input
                {...methods.register("nameAddress.address")}
                autoComplete="address-level3"
                className={clsx("input w-full sm:w-1/2", {
                  "input-error": methods.getFieldState("nameAddress.address")
                    .invalid,
                })}
                id={methods.register("nameAddress.address").name}
                type="text"
              />
              <ErrorMessage
                errors={methods.formState.errors}
                name={methods.register("nameAddress.address").name}
                render={({ message }) => (
                  <span className="text-error text-xs">{message}</span>
                )}
              />
            </fieldset>
          </div>
        </>
      )}
      {Number(prefectureId) === PREFECTURE_OTHER_ID && (
        <div className="sm:col-span-full">
          <fieldset className="fieldset">
            <label
              className="fieldset-label"
              htmlFor={methods.register("nameAddress.prefectureOther").name}
            >
              その他（具体的に記入して下さい）
              <span className="ml-1 text-xs text-red-400">必須</span>
            </label>
            <input
              {...methods.register("nameAddress.prefectureOther")}
              autoComplete="address-level1"
              className={clsx("input w-full sm:w-2/3", {
                "input-error": methods.getFieldState(
                  "nameAddress.prefectureOther",
                ).invalid,
              })}
              id={methods.register("nameAddress.prefectureOther").name}
              type="text"
            />
            <ErrorMessage
              errors={methods.formState.errors}
              name={methods.register("nameAddress.prefectureOther").name}
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
