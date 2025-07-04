import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { RegistrationSchema } from "@/[locale]/(registration)/registration/types";
import { STAY_CATEGORY_DEFAULT_VALUE_ID } from "@/constants/stay-category";
import supabase from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/database.types";

export function useSubmitRegistration(options: {
  onSuccess: (userId: number) => void;
}) {
  const { isPending, isError, isSuccess, mutateAsync } = useInsertMutation(
    supabase.from("users"),
    ["id"],
  );

  return {
    isPending,
    isError,
    isSuccess,
    insert: async (data: RegistrationSchema) => {
      await mutateAsync([transformRegistrationValues(data)]);
    },
  };
}

function transformRegistrationValues(
  data: RegistrationSchema,
): Database["public"]["Tables"]["users"]["Insert"] {
  const { nameAddress, contact, survey } = data;

  return {
    name: nameAddress.name,
    pronunciation: nameAddress.pronunciation,
    email: contact.email,
    phone: contact.phone,
    prefecture_id: Number(nameAddress.prefectureId),
    stay_category_id: Number(nameAddress.stayCategoryId), // TODO non_japaneseと被っているので整理する
    non_japanese:
      Number(nameAddress.stayCategoryId) !== STAY_CATEGORY_DEFAULT_VALUE_ID, // 外国人かどうかのフラグ
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
