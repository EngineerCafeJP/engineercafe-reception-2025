import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload, MdOutlineInfo } from "react-icons/md";
import {
  createMemberNumberImageBlob,
  drawMemberNumberChip,
  saveMemberNumberImage,
} from "@/[locale]/(registration)/registration/utils/member-number-image";

const MEMBER_NUMBER_CHIP_CANVAS_SIZE = 512;
const MEMBER_NUMBER_CHIP_TITLE = "Engineer Cafe";

type RegistrationCompleteProps = {
  createdUserId: number;
};

export default function RegistrationComplete({
  createdUserId,
}: RegistrationCompleteProps) {
  const t = useTranslations("RegistrationComplete");
  const memberNumber = String(createdUserId);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [saveImageError, setSaveImageError] = useState(false);

  const handleSaveImage = async () => {
    setIsSavingImage(true);
    setSaveImageError(false);

    try {
      const blob = await createMemberNumberImageBlob({
        label: MEMBER_NUMBER_CHIP_TITLE,
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
        <MemberNumberChip
          chipTitle={MEMBER_NUMBER_CHIP_TITLE}
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

function MemberNumberChip({
  chipTitle,
  label,
  memberNumber,
}: {
  chipTitle: string;
  label: string;
  memberNumber: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    drawMemberNumberChip({
      context,
      label: chipTitle,
      memberNumber,
      size: MEMBER_NUMBER_CHIP_CANVAS_SIZE,
    });
  }, [chipTitle, memberNumber]);

  return (
    <div className="mt-8 flex justify-center">
      <canvas
        ref={canvasRef}
        aria-label={`${label}: ${memberNumber}`}
        className="aspect-square w-52 max-w-[76vw]"
        height={MEMBER_NUMBER_CHIP_CANVAS_SIZE}
        role="img"
        width={MEMBER_NUMBER_CHIP_CANVAS_SIZE}
      />
    </div>
  );
}
