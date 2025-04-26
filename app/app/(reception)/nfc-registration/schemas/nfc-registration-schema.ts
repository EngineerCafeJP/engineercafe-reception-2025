import { z } from "zod";

export const nfcRegistrationSchema = z.object({
  cardId: z
    .string({ message: "カードIDを入力して下さい" })
    .nonempty({ message: "カードIDを入力して下さい" }),
  userId: z.number({ message: "ユーザーIDを入力して下さい" }),
});
