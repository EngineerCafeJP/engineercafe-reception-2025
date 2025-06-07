import { ErrorMessage } from "@hookform/error-message";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CardReaderControlButton from "@/[locale]/(reception)/components/CardReaderControlButton";
import LatestRegisteredUserId from "@/[locale]/(reception)/nfc-registration/components/LatestRegisteredUserId";
import { nfcRegistrationSchema } from "@/[locale]/(reception)/nfc-registration/schemas/nfc-registration-schema";
import { NfcRegistrationSchema } from "@/[locale]/(reception)/nfc-registration/types";
import { User } from "@/types";

type NfcRegistrationFormProps = {
  defaultUserId?: number;
  isCreateNfcPending: boolean;
  isLatestRegisteredUserLoading: boolean;
  latestRegisteredUser: Pick<User, "id" | "createdAt">;
  onSubmit: (data: NfcRegistrationSchema) => void;
};

export default function NfcRegistrationForm({
  defaultUserId,
  isCreateNfcPending,
  isLatestRegisteredUserLoading,
  latestRegisteredUser,
  onSubmit,
}: NfcRegistrationFormProps) {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    setValue,
    getFieldState,
  } = useForm<NfcRegistrationSchema>({
    defaultValues: {
      nfcId: "",
      userId: defaultUserId?.toString() || "",
    },
    resolver: standardSchemaResolver(nfcRegistrationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ nfcId: "", userId: "" });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className="card-body gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-4 sm:grid-cols-2">
        <fieldset className="fieldset sm:col-span-1">
          <label className="fieldset-label" htmlFor={register("nfcId").name}>
            カードID<span className="ml-1 text-xs text-red-400">必須</span>
          </label>
          <input
            {...register("nfcId")}
            autoComplete="off"
            className={clsx("input w-full", {
              "input-error": getFieldState("nfcId").invalid,
            })}
            id={register("nfcId").name}
            type="text"
          />
          <ErrorMessage
            errors={errors}
            name={register("nfcId").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
        <CardReaderControlButton
          className="sm:col-span-1"
          onDetectCard={(nfcId) => setValue("nfcId", nfcId)}
        />
        <fieldset className="fieldset sm:col-span-1">
          <label className="fieldset-label" htmlFor={register("userId").name}>
            ユーザーID
            <span className="ml-1 text-xs text-red-400">必須</span>
          </label>
          <input
            {...register("userId")}
            autoComplete="off"
            className={clsx("input w-full", {
              "input-error": getFieldState("userId").invalid,
            })}
            id={register("userId").name}
            inputMode="numeric"
            type="text"
          />
          <ErrorMessage
            errors={errors}
            name={register("userId").name}
            render={({ message }) => (
              <span className="text-error text-xs">{message}</span>
            )}
          />
        </fieldset>
        <LatestRegisteredUserId
          className="sm:col-span-1"
          isLoading={isLatestRegisteredUserLoading}
          latestRegisteredUser={latestRegisteredUser}
          onUserIdCopy={(userId) => {
            setValue("userId", userId.toString());
          }}
        />
      </div>
      <div className="card-actions grid grid-cols-2">
        <button
          className="btn"
          disabled={isCreateNfcPending}
          type="button"
          onClick={() => reset()}
        >
          クリア
        </button>
        <button className="btn btn-primary" type="submit">
          {isCreateNfcPending && <span className="loading loading-spinner" />}
          登録
        </button>
      </div>
    </form>
  );
}
