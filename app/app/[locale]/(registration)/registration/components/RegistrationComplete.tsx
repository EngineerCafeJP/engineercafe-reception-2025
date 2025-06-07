import { useTranslations } from "next-intl";
import { MdOutlineInfo } from "react-icons/md";

type RegistrationCompleteProps = {
  createdUserId: number;
};

export default function RegistrationComplete({
  createdUserId,
}: RegistrationCompleteProps) {
  const t = useTranslations("RegistrationComplete");

  return (
    <div className="mt-5">
      <div className="text-xl font-bold">{t("title")}</div>
      <div className="mt-10 flex flex-col">
        <span className="font-bold tracking-wide opacity-50">
          {t("userId")}
        </span>
        <span className="text-4xl font-black">{createdUserId}</span>
        <div
          className="alert alert-vertical alert-success alert-soft sm:alert-horizontal mt-10"
          role="alert"
        >
          <MdOutlineInfo size="1.5rem" />
          <div>
            <h3 className="font-bold">{t("alertTitle")}</h3>
            <div className="text-xs">{t("alertMessage")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
