import { PostgrestError } from "@supabase/supabase-js";
import camelcaseKeys from "camelcase-keys";
import { useTransition } from "react";
import { CamelCasedPropertiesDeep } from "type-fest";
import { fetchUserIdByNfcId } from "@/app/(reception)/queries/nfcs-queries";
import { Database } from "@/utils/supabase/database.types";

export const useSearchNfc = () => {
  const [isPending, startTransition] = useTransition();

  const search = async (
    cardId: string,
    options?: {
      onSuccess?: (
        data?: CamelCasedPropertiesDeep<
          Pick<Database["public"]["Tables"]["nfcs"]["Row"], "user_id">
        >,
      ) => void;
      onError?: (error: PostgrestError | string) => void;
    },
  ) => {
    startTransition(async () => {
      try {
        const { data, error } = await fetchUserIdByNfcId(cardId);

        if (error) {
          options?.onError?.(error);
          return;
        }

        options?.onSuccess?.(camelcaseKeys(data[0]));
      } catch {
        options?.onError?.("エラーが発生しました。");
      }
    });
  };

  return { isPending, search };
};
