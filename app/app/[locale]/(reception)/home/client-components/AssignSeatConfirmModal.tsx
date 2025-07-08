"use client";

import React, { useState } from "react";
import { useKey } from "react-use";
import { AssignSeatConfirmBox } from "@/[locale]/(reception)/home/client-components/AssignSeatConfirmBox";
import { Seat, User } from "@/types";

interface AssignSeatConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignSeat: (startTime: string) => void;
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

  const handleClose = () => {
    onClose();
  };

  useKey("Enter", () => onAssignSeat(startTime), undefined, [isOpen]);
  useKey("Escape", handleClose, undefined, [isOpen, handleClose]);

  return (
    <dialog
      className={`modal ${isOpen ? "modal-open" : ""}`}
      id="assign-seat-modal"
    >
      <AssignSeatConfirmBox
        seat={seat}
        startTime={startTime}
        user={user}
        onAssignSeat={(startTime: string) => onAssignSeat(startTime)}
        onChangeStartTime={(startTime: string) => setStartTime(startTime)}
        onClose={onClose}
      />

      <div className="modal-backdrop" onClick={handleClose}></div>
    </dialog>
  );
};

export default AssignSeatConfirmModal;
