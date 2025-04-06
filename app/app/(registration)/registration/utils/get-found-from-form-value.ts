import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { FOUND_OTHER_ID } from "@/app/constants/founds";
import { Found } from "@/app/types";

export function getFoundFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  founds: Found[] | null,
) {
  if (Number(methods.getValues("survey.foundId")) === FOUND_OTHER_ID) {
    return methods.getValues("survey.foundOther");
  }

  return founds?.find(
    (found) => found.foundId === Number(methods.getValues("survey.foundId")),
  )?.name;
}
