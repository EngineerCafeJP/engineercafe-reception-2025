import { z } from "zod";
import { nfcRegistrationSchema } from "@/[locale]/(reception)/nfc-registration/schemas/nfc-registration-schema";

export type NfcRegistrationSchema = z.infer<typeof nfcRegistrationSchema>;
