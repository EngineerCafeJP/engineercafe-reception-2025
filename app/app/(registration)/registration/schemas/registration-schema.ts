import { z } from "zod";
import { BELONG_OTHER_ID } from "@/app/constants/belongs";
import { FOUND_OTHER_ID } from "@/app/constants/founds";
import { JOB_OTHER_ID } from "@/app/constants/jobs";
import { PREFECTURE_OTHER_ID } from "@/app/constants/prefectures";

export const registrationSchema = z.object({
  consent: z.object({
    health: z.literal(true, {
      errorMap: () => ({ message: "体調に問題がないことを確認して下さい。" }),
    }),
    term: z.literal(true, {
      errorMap: () => ({ message: "利用規約に同意する必要があります。" }),
    }),
  }),
  nameAddress: z
    .object({
      name: z.string().nonempty({ message: "氏名を入力して下さい。" }),
      pronunciation: z
        .string()
        .nonempty({ message: "氏名（ふりがな）を入力して下さい。" }),
      postalCode: z.string().optional(),
      prefectureId: z
        .string()
        .nonempty({ message: "都道府県を1つ選択して下さい。" }),
      prefectureOther: z.string().optional(),
      city: z.string().optional(),
      address: z.string().optional(),
    })
    .superRefine(({ prefectureId, prefectureOther, city, address }, ctx) => {
      if (Number(prefectureId) === PREFECTURE_OTHER_ID) {
        if (!prefectureOther) {
          ctx.addIssue({
            path: ["prefectureOther"],
            message: "都道府県（その他）を入力して下さい。",
            code: "custom",
          });
        }
      } else {
        if (!city) {
          ctx.addIssue({
            path: ["city"],
            message: "市区町村を入力して下さい。",
            code: "custom",
          });
        }
        if (!address) {
          ctx.addIssue({
            path: ["address"],
            message: "丁目を入力して下さい。",
            code: "custom",
          });
        }
      }
    }),
  contact: z
    .object({
      phone: z.string().nonempty({ message: "電話番号を入力して下さい。" }),
      email: z
        .string()
        .nonempty({ message: "メールアドレスを入力して下さい。" })
        .email({ message: "メールアドレスの形式が正しくありません。" }),
      belongId: z.string({ message: "所属を1つ選択して下さい。" }),
      belongOther: z.string().optional(),
      belongDetail: z.string().optional(),
      jobId: z.string().nonempty({ message: "職業を1つ選択して下さい。" }),
      jobOther: z.string().optional(),
    })
    .superRefine(({ belongId, belongOther, jobId, jobOther }, ctx) => {
      if (Number(belongId) === BELONG_OTHER_ID) {
        if (!belongOther) {
          ctx.addIssue({
            path: ["belongOther"],
            message: "所属（その他）を入力して下さい。",
            code: "custom",
          });
        }
      }

      if (Number(jobId) === JOB_OTHER_ID) {
        if (!jobOther) {
          ctx.addIssue({
            path: ["jobOther"],
            message: "職業（その他）を入力して下さい。",
            code: "custom",
          });
        }
      }
    }),
  survey: z
    .object({
      foundId: z.string({
        message: "エンジニアカフェをどこで知ったかを1つ選択して下さい。",
      }),
      foundOther: z.string().optional(),
    })
    .superRefine(({ foundId, foundOther }, ctx) => {
      if (Number(foundId) === FOUND_OTHER_ID) {
        if (!foundOther) {
          ctx.addIssue({
            path: ["foundOther"],
            message:
              "エンジニアカフェをどこで知ったか（その他）を入力して下さい。",
            code: "custom",
          });
        }
      }
    }),
});
