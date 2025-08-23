"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useKey } from "react-use";
import { Seat, SeatUsage } from "@/types";
import { addMinutes, formatTimeWithQuarter } from "@/utils/format-time";

interface BatchExtendSeatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  seats: Seat[];
  seatUsages: SeatUsage[];
  onExecute: (seatUsages: SeatUsage[]) => void;
}

type SeatUsageWithSelected = {
  seatUsage: SeatUsage;
  seat: Seat | null;
  selected: boolean;
  endTime: Date | null;
};

export const BatchExtendSeatsModal: React.FC<BatchExtendSeatsModalProps> = ({
  isOpen,
  onClose,
  seats,
  seatUsages,
  onExecute,
}) => {
  const [seatUsagesWithSelected, setSeatUsagesWithSelected] = useState<
    SeatUsageWithSelected[]
  >([]);

  useEffect(() => {
    if (!isOpen) return;

    setSeatUsagesWithSelected(
      seatUsages.map((seatUsage) => {
        const endTime = seatUsage?.startTime
          ? addMinutes(seatUsage.startTime, seatUsage.usageDurationMinutes)
          : null;
        const isOver = endTime ? new Date(endTime) < new Date() : false;
        const seat = seats.find((seat) => seat.id === seatUsage.seatId);

        return {
          seatUsage,
          seat: seat || null,
          selected: isOver,
          endTime: endTime ? new Date(endTime) : null,
        };
      }),
    );
  }, [seatUsages, seats, isOpen]);

  const handleChangeSelected = (
    seatUsageWithSelected: SeatUsageWithSelected,
  ) => {
    const newSeatUsagesWithSelected = seatUsagesWithSelected.map((s) => {
      if (s.seatUsage.id === seatUsageWithSelected.seatUsage.id) {
        return {
          ...s,
          selected: !s.selected,
        };
      }
      return s;
    });

    setSeatUsagesWithSelected(newSeatUsagesWithSelected);
  };

  const handleExecute = () => {
    const seatUsages = seatUsagesWithSelected
      .filter((s) => s.selected)
      .map((s) => s.seatUsage);
    onExecute(seatUsages);
    onClose();
  };

  const handleKeyboardExecute = useCallback(() => {
    if (!isOpen) return;
    const seatUsages = seatUsagesWithSelected
      .filter((s) => s.selected)
      .map((s) => s.seatUsage);
    onExecute(seatUsages);
    onClose();
  }, [isOpen, seatUsagesWithSelected, onExecute, onClose]);

  const handleKeyboardClose = useCallback(() => {
    if (!isOpen) return;
    onClose();
  }, [isOpen, onClose]);

  // useKeyでキーボードイベントをハンドリング
  useKey("Enter", handleKeyboardExecute, undefined, [isOpen]);
  useKey("Escape", handleKeyboardClose, undefined, [isOpen]);

  return (
    <dialog
      className={`modal ${isOpen ? "modal-open" : ""}`}
      id="batch-extend-seats-modal"
    >
      <div className="modal-box border-accent border-b-2 p-[0]">
        <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
          座席一括延長
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          <p className="mb-4 text-center text-sm">
            チェックされている座席を延長します。
          </p>
          {seatUsagesWithSelected
            .sort((a, b) => {
              if (a.seatUsage.startTime && b.seatUsage.startTime) {
                return (
                  new Date(a.seatUsage.startTime).getTime() -
                  new Date(b.seatUsage.startTime).getTime()
                );
              }
              return 0;
            })
            .map((seatUsageWithSelected) => (
              <div
                key={seatUsageWithSelected.seatUsage.id}
                className="border-b"
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <input
                      checked={seatUsageWithSelected.selected}
                      type="checkbox"
                      onChange={() =>
                        handleChangeSelected(seatUsageWithSelected)
                      }
                    />
                    <div>
                      <div>{seatUsageWithSelected.seat?.name}</div>
                      <div>{seatUsageWithSelected.seatUsage.userId}</div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div
                      className={`flex items-center align-[middle] text-[1rem] ${
                        seatUsageWithSelected.endTime &&
                        seatUsageWithSelected.endTime < new Date()
                          ? "text-error"
                          : "text-base-content"
                      }`}
                    >
                      <div>
                        {formatTimeWithQuarter(
                          seatUsageWithSelected.seatUsage.startTime,
                        )}
                      </div>
                      <div className="mx-2">-</div>
                      <div>
                        {formatTimeWithQuarter(
                          addMinutes(
                            seatUsageWithSelected.seatUsage.startTime,
                            seatUsageWithSelected.seatUsage
                              .usageDurationMinutes,
                          ),
                        )}
                      </div>
                    </div>
                    {seatUsageWithSelected.selected && (
                      <div className="flex items-center align-[middle] text-[1rem]">
                        <div className="text-accent">
                          {formatTimeWithQuarter(
                            addMinutes(
                              seatUsageWithSelected.seatUsage.startTime,
                              seatUsageWithSelected.seatUsage
                                .usageDurationMinutes,
                            ),
                          )}
                        </div>

                        <div className="text-accent mx-4">-</div>
                        <div className="text-accent">
                          {formatTimeWithQuarter(
                            addMinutes(
                              seatUsageWithSelected.seatUsage.startTime,
                              seatUsageWithSelected.seatUsage
                                .usageDurationMinutes +
                                (seatUsageWithSelected.seat
                                  ?.usageDurationMinutes ?? 120),
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-between p-4">
          <button
            className="btn"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            キャンセル
          </button>
          <button className="btn btn-primary" onClick={handleExecute}>
            実行する
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default BatchExtendSeatsModal;
