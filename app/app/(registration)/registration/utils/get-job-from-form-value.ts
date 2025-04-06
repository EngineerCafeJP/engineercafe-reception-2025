import { UseFormReturn } from "react-hook-form";
import { RegistrationSchema } from "@/app/(registration)/registration/types";
import { JOB_OTHER_ID } from "@/app/constants/jobs";
import { Job } from "@/app/types";

export function getJobFromFormValue(
  methods: UseFormReturn<RegistrationSchema>,
  jobs: Job[] | null,
) {
  if (Number(methods.getValues("contact.jobId")) === JOB_OTHER_ID) {
    return methods.getValues("contact.jobOther");
  }

  return jobs?.find(
    (job) => job.jobId === Number(methods.getValues("contact.jobId")),
  )?.name;
}
