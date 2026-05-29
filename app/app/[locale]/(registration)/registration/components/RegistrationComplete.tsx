import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload, MdOutlineInfo } from "react-icons/md";
import {
  createMemberNumberImageBlob,
  downloadMemberNumberImage,
  formatMemberNumber,
} from "@/[locale]/(registration)/registration/utils/member-number-image";

const MEMBER_NUMBER_CHIP_TITLE = "Engineer Cafe";

type RegistrationCompleteProps = {
  createdUserId: number;
};

export default function RegistrationComplete({
  createdUserId,
}: RegistrationCompleteProps) {
  const t = useTranslations("RegistrationComplete");
  const memberNumber = formatMemberNumber(createdUserId);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [memberNumberImageBlob, setMemberNumberImageBlob] = useState<Blob>();
  const [memberNumberImageUrl, setMemberNumberImageUrl] = useState<string>();
  const [saveImageError, setSaveImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let imageUrl: string | undefined;

    setMemberNumberImageBlob(undefined);
    setMemberNumberImageUrl(undefined);
    setSaveImageError(false);

    createMemberNumberImageBlob({
      label: MEMBER_NUMBER_CHIP_TITLE,
      userId: createdUserId,
    })
      .then((blob) => {
        if (!isMounted) {
          return;
        }

        imageUrl = URL.createObjectURL(blob);
        setMemberNumberImageBlob(blob);
        setMemberNumberImageUrl(imageUrl);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setSaveImageError(true);
      });

    return () => {
      isMounted = false;

      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [createdUserId]);

  const handleSaveImage = () => {
    if (!memberNumberImageBlob) {
      setSaveImageError(true);
      return;
    }

    setIsSavingImage(true);
    setSaveImageError(false);

    try {
      downloadMemberNumberImage(memberNumberImageBlob, createdUserId);
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
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-bold tracking-wide opacity-50">
            {t("userId")}
          </span>
          <span className="text-3xl leading-none font-black">
            {memberNumber}
          </span>
        </div>
        <MemberNumberChip
          imageUrl={memberNumberImageUrl}
          label={t("userId")}
          memberNumber={memberNumber}
        />
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
          disabled={isSavingImage || !memberNumberImageBlob}
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

function MemberNumberChip({
  imageUrl,
  label,
  memberNumber,
}: {
  imageUrl?: string;
  label: string;
  memberNumber: string;
}) {
  return (
    <div className="mt-8 flex justify-center">
      {imageUrl ? (
        // A native img keeps the generated blob available to the browser image menu.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${label}: ${memberNumber}`}
          className="aspect-square w-52 max-w-[76vw]"
          src={imageUrl}
        />
      ) : (
        <div
          aria-label={`${label}: ${memberNumber}`}
          className="flex aspect-square w-52 max-w-[76vw] items-center justify-center"
          role="status"
        >
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
    </div>
  );
}
