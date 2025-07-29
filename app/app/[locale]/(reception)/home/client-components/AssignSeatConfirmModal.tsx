"use client";

import React, { useState } from "react";
import { useKey } from "react-use";
import { AssignSeatConfirmBox } from "@/[locale]/(reception)/home/client-components/AssignSeatConfirmBox";
import { Seat, User } from "@/types";

interface AssignSeatConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignSeat: (startTime: string, usageDurationMinutes: number) => void;
  user: User;
  seat: Seat;
}

export const AssignSeatConfirmModal: React.FC<AssignSeatConfirmModalProps> = ({
  isOpen,
  onClose,
  onAssignSeat,
  user,
  seat,
}) => {
  const [startTime, setStartTime] = useState<string>(new Date().toISOString());
  const [usageDurationMinutes, setUsageDurationMinutes] = useState<number>(
    seat.usageDurationMinutes ?? 120,
  );

  const handleClose = () => {
    onClose();
  };

  useKey(
    "Enter",
    () => onAssignSeat(startTime, usageDurationMinutes),
    undefined,
    [isOpen],
  );
  useKey("Escape", handleClose, undefined, [isOpen, handleClose]);

  return (
    <dialog
      className={`modal ${isOpen ? "modal-open" : ""}`}
      id="assign-seat-modal"
    >
      <AssignSeatConfirmBox
        seat={seat}
        startTime={startTime}
        usageDurationMinutes={usageDurationMinutes}
        user={user}
        onAssignSeat={(startTime: string, usageDurationMinutes: number) =>
          onAssignSeat(startTime, usageDurationMinutes)
        }
        onChangeStartTime={(startTime: string) => setStartTime(startTime)}
        onChangeUsageDurationMinutes={(minutes: number) => {
          setUsageDurationMinutes(minutes);
        }}
        onClose={onClose}
      />

      <div className="modal-backdrop" onClick={handleClose}></div>
    </dialog>
  );
};

export default AssignSeatConfirmModal;
