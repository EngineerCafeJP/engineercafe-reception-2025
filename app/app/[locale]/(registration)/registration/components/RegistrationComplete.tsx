import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdOutlineFileDownload, MdOutlineInfo } from "react-icons/md";
import {
  createMemberNumberImageBlob,
  saveMemberNumberImage,
} from "@/[locale]/(registration)/registration/utils/member-number-image";

type RegistrationCompleteProps = {
  createdUserId: number;
};

export default function RegistrationComplete({
  createdUserId,
}: RegistrationCompleteProps) {
  const t = useTranslations("RegistrationComplete");
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [saveImageError, setSaveImageError] = useState(false);

  const handleSaveImage = async () => {
    setIsSavingImage(true);
    setSaveImageError(false);

    try {
      const blob = await createMemberNumberImageBlob({
        label: t("userId"),
        note: t("imageNote"),
        title: t("imageTitle"),
        userId: createdUserId,
      });

      await saveMemberNumberImage({
        blob,
        shareText: t("shareText"),
        shareTitle: t("shareTitle"),
        userId: createdUserId,
      });
    } catch {
      setSaveImageError(true);
    } finally {
      setIsSavingImage(false);
    }
  };

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
        <button
          className="btn btn-primary mt-6 w-full sm:w-fit"
          disabled={isSavingImage}
          type="button"
          onClick={handleSaveImage}
        >
          {isSavingImage ? (
            <>
              <span className="loading loading-spinner" />
              {t("savingImage")}
            </>
          ) : (
            <>
              <MdOutlineFileDownload size="1.25rem" />
              {t("saveImage")}
            </>
          )}
        </button>
        {saveImageError && (
          <div className="text-error mt-3 text-sm" role="alert">
            {t("saveError")}
          </div>
        )}
      </div>
    </div>
  );
}
