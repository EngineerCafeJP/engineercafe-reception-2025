import React from "react";
import { EmptySeatModalBox } from "./EmptySeatModalBox";
import { Seat } from "@/app/types";

interface SeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  seat: Seat | null;
}

export const EmptySeatModal: React.FC<SeatModalProps> = ({
  isOpen,
  onClose,
  seat
}) => {


  if (seat == null) {
    return <></>
  }

  return (
    <dialog id="seat-modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <EmptySeatModalBox seat={seat} onClose={onClose} />
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default EmptySeatModal;
