"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FinishSeatUsage, Seat, SeatUsage } from "@/types";
import { addMinutes, formatTimeWithQuarter } from "@/utils/format-time";
import { LeaveSeatConfirmModalBox } from "../home/client-components/LeaveSeatConfirmModalBox";

interface BatchExtendSeatsModalProps {
  onClose: () => void;
  seats: Seat[];
  seatUsages: SeatUsage[];
  onExecute: (seatUsages: SeatUsage[]) => void;
  onFinishSeatUsage: FinishSeatUsage;
}

export function BatchExtendSeatsModal({
  onClose,
  seats,
  seatUsages,
  onExecute,
  onFinishSeatUsage,
}: BatchExtendSeatsModalProps) {
  const [selection, setSelection] = useState(() => new Map<number, boolean>());
  const [checkout, setCheckout] = useState<SeatUsage | null>(null);
  const [checkoutError, setCheckoutError] = useState<string>();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const checkoutInProgress = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listCancelRef = useRef<HTMLButtonElement>(null);
  const confirmCancelRef = useRef<HTMLButtonElement>(null);
  const pendingStatusRef = useRef<HTMLParagraphElement>(null);
  const lastCheckoutId = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  useEffect(() => {
    const now = new Date();
    setSelection((previous) => {
      const next = new Map<number, boolean>();
      for (const usage of seatUsages) {
        const endTime = new Date(
          addMinutes(usage.startTime, usage.usageDurationMinutes),
        );
        next.set(usage.id, previous.get(usage.id) ?? endTime < now);
      }
      return next;
    });
  }, [seatUsages]);

  useEffect(() => {
    if (isCheckingOut) {
      pendingStatusRef.current?.focus();
    } else if (checkout) {
      confirmCancelRef.current?.focus();
    } else if (lastCheckoutId.current !== null) {
      const button = dialogRef.current?.querySelector<HTMLButtonElement>(
        `#batch-seat-checkout-${lastCheckoutId.current}`,
      );
      (button ?? listCancelRef.current)?.focus();
      lastCheckoutId.current = null;
    }
  }, [checkout, isCheckingOut]);

  const getSeat = (usage: SeatUsage) =>
    seats.find((seat) => seat.id === usage.seatId);

  const getSeatName = (usage: SeatUsage) =>
    getSeat(usage)?.name ?? `座席ID ${usage.seatId}`;

  const sortedUsages = [...seatUsages].sort(
    (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime),
  );
  const selectedUsages = sortedUsages.filter((usage) =>
    selection.get(usage.id),
  );

  const closePanel = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleExecute = () => {
    if (selectedUsages.length === 0) return;
    onExecute(selectedUsages);
    closePanel();
  };

  const openCheckout = (usage: SeatUsage) => {
    lastCheckoutId.current = usage.id;
    setCheckout(usage);
    setCheckoutError(
      new Date(usage.startTime) > new Date()
        ? "利用開始前のため退席できません。"
        : undefined,
    );
  };

  const handleDismiss = () => {
    if (checkoutInProgress.current) return;
    if (checkout) {
      setCheckout(null);
    } else {
      closePanel();
    }
  };

  const handleCheckout = async () => {
    if (!checkout || checkoutInProgress.current) return;

    const currentUsage = seatUsages.find((usage) => usage.id === checkout.id);
    if (!currentUsage) {
      setCheckout(null);
      return;
    }

    if (new Date(currentUsage.startTime) > new Date()) {
      setCheckoutError("利用開始前のため退席できません。");
      return;
    }

    checkoutInProgress.current = true;
    setIsCheckingOut(true);
    setCheckoutError(undefined);
    try {
      const message = await onFinishSeatUsage(currentUsage);
      if (message) {
        setCheckoutError(message);
      } else {
        setCheckout(null);
      }
    } catch {
      setCheckoutError("退席の処理に失敗しました。");
    } finally {
      checkoutInProgress.current = false;
      setIsCheckingOut(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      handleDismiss();
    } else if (event.key === "Enter") {
      event.stopPropagation();
      if (event.repeat || checkoutInProgress.current) {
        event.preventDefault();
      } else if (!checkout && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
        handleExecute();
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={checkout ? "退席確認" : "座席一括延長"}
      className="modal"
      id="batch-extend-seats-modal"
      onCancel={(event) => {
        event.preventDefault();
        handleDismiss();
      }}
      onKeyDown={handleKeyDown}
    >
      {checkout ? (
        <LeaveSeatConfirmModalBox
          cancelButtonRef={confirmCancelRef}
          enableGlobalShortcuts={false}
          errorMessage={checkoutError}
          isPending={isCheckingOut}
          pendingStatusRef={pendingStatusRef}
          seatName={getSeatName(checkout)}
          seatUsage={checkout}
          onClose={handleDismiss}
          onNextButtonClick={handleCheckout}
        />
      ) : (
        <div className="modal-box border-accent border-b-2 p-0">
          <h2 className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
            座席一括延長
          </h2>

          <div className="max-h-[50vh] overflow-y-auto p-2">
            <p className="mb-4 text-center text-sm">
              {seatUsages.length === 0
                ? "利用中の座席はありません"
                : "チェックされている座席を延長します。"}
            </p>
            {sortedUsages.map((usage) => {
              const seat = getSeat(usage);
              const seatName = seat?.name ?? `座席ID ${usage.seatId}`;
              const endTime = addMinutes(
                usage.startTime,
                usage.usageDurationMinutes,
              );
              const selected = selection.get(usage.id) ?? false;

              return (
                <div
                  key={usage.id}
                  className="flex flex-wrap items-center justify-between gap-2 border-b p-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      aria-label={`${seatName}を延長対象にする`}
                      checked={selected}
                      type="checkbox"
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setSelection((previous) =>
                          new Map(previous).set(usage.id, checked),
                        );
                      }}
                    />
                    <div>
                      <div>{seatName}</div>
                      <div>{usage.userId}</div>
                    </div>
                  </div>
                  <div className="whitespace-nowrap">
                    <div
                      className={
                        new Date(endTime) < new Date()
                          ? "text-error"
                          : "text-base-content"
                      }
                    >
                      {formatTimeWithQuarter(usage.startTime)} -{" "}
                      {formatTimeWithQuarter(endTime)}
                    </div>
                    {selected && (
                      <div className="text-accent">
                        {formatTimeWithQuarter(endTime)} -{" "}
                        {formatTimeWithQuarter(
                          addMinutes(
                            endTime,
                            seat?.usageDurationMinutes ?? 120,
                          ),
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    aria-label={`${seatName}を退席`}
                    className="btn btn-outline btn-warning btn-sm"
                    id={`batch-seat-checkout-${usage.id}`}
                    type="button"
                    onClick={() => openCheckout(usage)}
                  >
                    退席
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between p-4">
            <button
              ref={listCancelRef}
              className="btn"
              type="button"
              onClick={closePanel}
            >
              キャンセル
            </button>
            <button
              className="btn btn-primary"
              disabled={selectedUsages.length === 0}
              type="button"
              onClick={handleExecute}
            >
              実行する
            </button>
          </div>
        </div>
      )}

      <div className="modal-backdrop" onClick={handleDismiss}></div>
    </dialog>
  );
}

export default BatchExtendSeatsModal;
