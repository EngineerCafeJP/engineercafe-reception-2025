import { z } from "zod";

export const nfcRegistrationSchema = z.object({
  nfcId: z
    .string({ message: "カードIDを入力して下さい。" })
    .nonempty({ message: "カードIDを入力して下さい。" }),
  userId: z
    .string({ message: "ユーザーIDを入力して下さい。" })
    .regex(/^\d+$/, { message: "ユーザーIDを入力して下さい。" }),
});
