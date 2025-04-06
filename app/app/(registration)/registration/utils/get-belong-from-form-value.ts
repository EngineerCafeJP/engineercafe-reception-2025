import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { BELONG_OTHER_ID } from "@/app/constants/belongs";
import { Belong } from "@/app/types";

export function getBelongFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  belongs: Belong[] | null,
) {
  if (Number(methods.getValues("contact.belongId")) === BELONG_OTHER_ID) {
    return methods.getValues("contact.belongOther");
  }

  return belongs?.find(
    (belong) =>
      belong.belongId === Number(methods.getValues("contact.belongId")),
  )?.name;
}
