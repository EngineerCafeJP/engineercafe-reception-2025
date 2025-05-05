import { z } from "zod";
import { registrationSchema } from "@/app/(registration)/registration/schemas/registration-schema";

export type RegistrationSchema = z.infer<typeof registrationSchema>;
