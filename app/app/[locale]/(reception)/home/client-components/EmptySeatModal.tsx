"use client";

import React from "react";
import { useKey } from "react-use";
import { Seat } from "@/types";
import { EmptySeatModalBox } from "./EmptySeatModalBox";

interface SeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSeat: (
    seatId: number,
    seatParams: {
      outOfService: boolean;
      attentionMessage: string;
    },
  ) => void;
  seat: Seat | null;
}

export const EmptySeatModal: React.FC<SeatModalProps> = ({
  isOpen,
  onClose,
  onUpdateSeat,
  seat,
}) => {
  useKey("Escape", onClose, undefined, [isOpen]);

  if (seat == null) {
    return <></>;
  }

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="seat-modal">
      <EmptySeatModalBox
        seat={seat}
        onClose={onClose}
        onUpdateSeat={onUpdateSeat}
      />
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default EmptySeatModal;
