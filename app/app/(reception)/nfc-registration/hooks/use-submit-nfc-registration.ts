import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { NfcRegistrationSchema } from "@/app/(reception)/nfc-registration/types";
import supabase from "@/utils/supabase/client";

export function useSubmitNfcRegistration(options?: {
  onSuccess?: (id: number) => void;
}) {
  const { isPending, isError, isSuccess, error, mutateAsync } =
    useInsertMutation(supabase.from("nfcs"), ["id"], "id", {
      onSuccess: (data) => {
        if (data && options?.onSuccess) {
          options.onSuccess(data[0].id);
        }
      },
    });

  return {
    isPending,
    isError,
    isSuccess,
    error,
    insert: async (data: NfcRegistrationSchema) => {
      await mutateAsync([{ user_id: data.userId, nfc_id: data.cardId }]);
    },
  };
}
