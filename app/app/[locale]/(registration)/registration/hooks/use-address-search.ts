import { useTransition } from "react";
import { ZIPCLOUD_API_URL } from "@/app/[locale]/(registration)/registration/constants/zipcloud";

type ZipcloudResponse = {
  status: number;
  message: string | null;
  results: Address[] | null;
};

type Address = {
  zipcode: string;
  prefcode: string;
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
};

export function useAddressSearch() {
  const [isPending, startTransition] = useTransition();

  const searchAddress = async (
    postalCode?: string,
    options?: {
      onSuccess: (data: Address) => void;
      onError: (error: string) => void;
    },
  ) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${ZIPCLOUD_API_URL}?zipcode=${postalCode}`);
        const data: ZipcloudResponse = await res.json();

        if (data.status !== 200 || data.results === null) {
          options?.onError(data.message ?? "エラーが発生しました。");
        } else {
          options?.onSuccess(data.results[0]);
        }
      } catch {
        options?.onError("エラーが発生しました。");
      }
    });
  };

  return { isPending, searchAddress };
}
