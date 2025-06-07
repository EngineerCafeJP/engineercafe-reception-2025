import { useTranslations } from "next-intl";
import { z } from "zod";
import { BELONG_OTHER_ID } from "@/constants/belongs";
import { FOUND_OTHER_ID } from "@/constants/founds";
import { JOB_OTHER_ID } from "@/constants/jobs";
import { PREFECTURE_OTHER_ID } from "@/constants/prefectures";

export const registrationSchema = (
  t: ReturnType<typeof useTranslations<"Registration">>,
) =>
  z.object({
    consent: z.object({
      health: z.literal(true, {
        errorMap: () => ({ message: t("consent.health") }),
      }),
      term: z.literal(true, {
        errorMap: () => ({ message: t("consent.term") }),
      }),
    }),
    nameAddress: z
      .object({
        name: z.string().nonempty({ message: t("nameAddress.name") }),
        pronunciation: z
          .string()
          .nonempty({ message: t("nameAddress.pronunciation") }),
        postalCode: z.string().optional(),
        prefectureId: z
          .string()
          .regex(/^\d+$/, { message: t("nameAddress.prefectureId") }),
        prefectureOther: z.string().optional(),
        city: z.string().optional(),
        address: z.string().optional(),
      })
      .superRefine(({ prefectureId, prefectureOther, city, address }, ctx) => {
        if (Number(prefectureId) === PREFECTURE_OTHER_ID) {
          if (!prefectureOther) {
            ctx.addIssue({
              path: ["prefectureOther"],
              message: t("nameAddress.prefectureOther"),
              code: "custom",
            });
          }
        } else {
          if (!city) {
            ctx.addIssue({
              path: ["city"],
              message: t("nameAddress.city"),
              code: "custom",
            });
          }
          if (!address) {
            ctx.addIssue({
              path: ["address"],
              message: t("nameAddress.address"),
              code: "custom",
            });
          }
        }
      }),
    contact: z
      .object({
        phone: z.string().nonempty({ message: t("contact.phone") }),
        email: z
          .string()
          .nonempty({ message: t("contact.email.empty") })
          .email({ message: t("contact.email.invalid") }),
        belongId: z
          .string({ message: t("contact.belongId") })
          .regex(/^\d+$/, { message: t("contact.belongId") }),
        belongOther: z.string().optional(),
        belongDetail: z.string().optional(),
        jobId: z.string().regex(/^\d+$/, { message: t("contact.jobId") }),
        jobOther: z.string().optional(),
      })
      .superRefine(({ belongId, belongOther, jobId, jobOther }, ctx) => {
        if (Number(belongId) === BELONG_OTHER_ID) {
          if (!belongOther) {
            ctx.addIssue({
              path: ["belongOther"],
              message: t("contact.belongOther"),
              code: "custom",
            });
          }
        }

        if (Number(jobId) === JOB_OTHER_ID) {
          if (!jobOther) {
            ctx.addIssue({
              path: ["jobOther"],
              message: t("contact.jobOther"),
              code: "custom",
            });
          }
        }
      }),
    survey: z
      .object({
        foundId: z
          .string({
            message: t("survey.foundId"),
          })
          .regex(/^\d+$/, {
            message: t("survey.foundId"),
          }),
        foundOther: z.string().optional(),
      })
      .superRefine(({ foundId, foundOther }, ctx) => {
        if (Number(foundId) === FOUND_OTHER_ID) {
          if (!foundOther) {
            ctx.addIssue({
              path: ["foundOther"],
              message: t("survey.foundOther"),
              code: "custom",
            });
          }
        }
      }),
  });
