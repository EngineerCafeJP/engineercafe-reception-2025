import { z } from "zod";
import { nfcRegistrationSchema } from "@/app/(reception)/nfc-registration/schemas/nfc-registration-schema";

export type NfcRegistrationSchema = z.infer<typeof nfcRegistrationSchema>;
