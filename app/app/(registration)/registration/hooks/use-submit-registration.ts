import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import supabase from "@/utils/supabase/client";

export function useSubmitRegistration(options: {
  onSuccess: (userId: number) => void;
}) {
  const { isPending, isError, isSuccess, mutateAsync } = useInsertMutation(
    // Use `any` type until the following issue is fixed.
    // https://github.com/psteinroe/supabase-cache-helpers/issues/557
    // TODO: Need to be fixed after the issue is resolved.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.from("users") as any,
    ["id"],
    "id",
    {
      onSuccess: (data) => {
        if (data) {
          options.onSuccess(data[0].id);
        }
      },
    },
  );

  return {
    isPending,
    isError,
    isSuccess,
    insert: async (data: RegistrationSchema) => {
      // Use `any` type until the following issue is fixed.
      // https://github.com/psteinroe/supabase-cache-helpers/issues/557
      // TODO: Need to be fixed after the issue is resolved.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await mutateAsync(transformRegistrationValues(data) as any);
    },
  };
}

function transformRegistrationValues(data: RegistrationSchema) {
  const { nameAddress, contact, survey } = data;

  return {
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
  };
}
