"use client";

import React from "react";
import { Seat } from "@/app/types";
import { EmptySeatModalBox } from "./EmptySeatModalBox";

interface SeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  seat: Seat | null;
}

export const EmptySeatModal: React.FC<SeatModalProps> = ({
  isOpen,
  onClose,
  seat,
}) => {
  if (seat == null) {
    return <></>;
  }

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="seat-modal">
      <EmptySeatModalBox seat={seat} onClose={onClose} />
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default EmptySeatModal;
