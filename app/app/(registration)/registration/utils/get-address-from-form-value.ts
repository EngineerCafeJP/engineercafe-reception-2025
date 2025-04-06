import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { PREFECTURE_OTHER_ID } from "@/app/constants/prefectures";
import { Prefecture } from "@/app/types";

export function getAddressFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  prefectures: Prefecture[] | null,
) {
  if (
    Number(methods.getValues("nameAddress.prefectureId")) ===
    PREFECTURE_OTHER_ID
  ) {
    return methods.getValues("nameAddress.prefectureOther");
  }

  return `${
    prefectures?.find(
      (prefecture) =>
        prefecture.prefectureId ===
        Number(methods.getValues("nameAddress.prefectureId")),
    )?.name
  }${methods.getValues("nameAddress.city")}${methods.getValues("nameAddress.address")}`;
}
