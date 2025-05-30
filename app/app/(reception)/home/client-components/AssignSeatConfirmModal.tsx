"use client";

import React from "react";
import { useKey } from "react-use";
import { AssignSeatConfirmBox } from "@/app/(reception)/home/client-components/AssignSeatConfirmBox";
import { Seat, User } from "@/app/types";

interface AssignSeatConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignSeat: () => void;
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
  const handleClose = () => {
    onClose();
  };

  useKey("Enter", onAssignSeat, undefined, [isOpen, onAssignSeat]);
  useKey("Escape", handleClose, undefined, [isOpen, handleClose]);

  return (
    <dialog
      className={`modal ${isOpen ? "modal-open" : ""}`}
      id="assign-seat-modal"
    >
      <AssignSeatConfirmBox
        seat={seat}
        user={user}
        onAssignSeat={onAssignSeat}
        onClose={onClose}
      />

      <div className="modal-backdrop" onClick={handleClose}></div>
    </dialog>
  );
};

export default AssignSeatConfirmModal;
