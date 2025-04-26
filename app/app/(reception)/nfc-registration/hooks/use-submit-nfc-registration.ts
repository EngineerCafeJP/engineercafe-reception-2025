import { useInsertMutation } from "@supabase-cache-helpers/postgrest-react-query";
import { NfcRegistrationSchema } from "@/app/(reception)/nfc-registration/types";
import supabase from "@/utils/supabase/client";

export function useSubmitNfcRegistration(options?: {
  onSuccess?: (id: number) => void;
}) {
  const { isPending, isError, isSuccess, error, mutateAsync } =
    useInsertMutation(
      // Use `any` type until the following issue is fixed.
      // https://github.com/psteinroe/supabase-cache-helpers/issues/557
      // TODO: Need to be fixed after the issue is resolved.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase.from("nfcs") as any,
      ["id"],
      "id",
      {
        onSuccess: (data) => {
          if (data && options?.onSuccess) {
            options.onSuccess(data[0].id);
          }
        },
      },
    );

  return {
    isPending,
    isError,
    isSuccess,
    error,
    insert: async (data: NfcRegistrationSchema) => {
      // Use `any` type until the following issue is fixed.
      // https://github.com/psteinroe/supabase-cache-helpers/issues/557
      // TODO: Need to be fixed after the issue is resolved.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await mutateAsync({ user_id: data.userId, nfc_id: data.cardId } as any);
    },
  };
}
