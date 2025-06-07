import { z } from "zod";
import { nfcRegistrationSchema } from "@/app/[locale]/(reception)/nfc-registration/schemas/nfc-registration-schema";

export type NfcRegistrationSchema = z.infer<typeof nfcRegistrationSchema>;
