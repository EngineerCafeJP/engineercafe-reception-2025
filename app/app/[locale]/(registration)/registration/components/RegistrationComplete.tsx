import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  MdOutlineFileDownload,
  MdOutlineInfo,
  MdOutlineIosShare,
} from "react-icons/md";
import {
  canShareMemberNumberImage,
  createMemberNumberImageBlob,
  drawMemberNumberChip,
  downloadMemberNumberImage,
  formatMemberNumber,
  shareMemberNumberImage,
} from "@/[locale]/(registration)/registration/utils/member-number-image";

const MEMBER_NUMBER_CHIP_CANVAS_SIZE = 512;
const MEMBER_NUMBER_CHIP_TITLE = "Engineer Cafe";
type MemberNumberImageAction = "download" | "share";

type RegistrationCompleteProps = {
  createdUserId: number;
};

export default function RegistrationComplete({
  createdUserId,
}: RegistrationCompleteProps) {
  const t = useTranslations("RegistrationComplete");
  const memberNumber = formatMemberNumber(createdUserId);
  const [activeImageAction, setActiveImageAction] =
    useState<MemberNumberImageAction>();
  const [canShareImage, setCanShareImage] = useState(false);
  const [saveImageError, setSaveImageError] = useState(false);

  useEffect(() => {
    setCanShareImage(canShareMemberNumberImage());
  }, []);

  const handleImageAction = async (action: MemberNumberImageAction) => {
    setActiveImageAction(action);
    setSaveImageError(false);

    try {
      const blob = await createMemberNumberImageBlob({
        label: MEMBER_NUMBER_CHIP_TITLE,
        userId: createdUserId,
      });

      if (action === "share") {
        await shareMemberNumberImage({
          blob,
          shareText: t("shareText"),
          shareTitle: t("shareTitle"),
          userId: createdUserId,
        });
        return;
      }

      downloadMemberNumberImage(blob, createdUserId);
    } catch {
      setSaveImageError(true);
    } finally {
      setActiveImageAction(undefined);
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
        <div className="mt-6 flex w-full gap-3 sm:w-fit">
          {canShareImage && (
            <button
              className="btn btn-secondary min-w-0 flex-1 whitespace-nowrap sm:flex-none"
              disabled={activeImageAction !== undefined}
              type="button"
              onClick={() => handleImageAction("share")}
            >
              {activeImageAction === "share" ? (
                <>
                  <span className="loading loading-spinner" />
                  {t("sharingImage")}
                </>
              ) : (
                <>
                  <MdOutlineIosShare size="1.25rem" />
                  {t("shareImage")}
                </>
              )}
            </button>
          )}
          <button
            className="btn btn-primary min-w-0 flex-1 whitespace-nowrap sm:flex-none"
            disabled={activeImageAction !== undefined}
            type="button"
            onClick={() => handleImageAction("download")}
          >
            {activeImageAction === "download" ? (
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
        </div>
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
