import { z } from "zod";
import { registrationSchema } from "@/[locale]/(registration)/registration/schemas/registration-schema";

export type RegistrationSchema = z.infer<ReturnType<typeof registrationSchema>>;
