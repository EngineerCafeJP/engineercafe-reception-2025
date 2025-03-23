import React, { useState } from "react";
import { Seat, SeatUsage } from "@/app/types";
import { ExtendSeatConfirmModalBox } from "./ExtendSeatConfirmModalBox";
import { InUseSeatModalBox } from "./InUseSeatModalBox";
import { LeaveSeatConfirmModalBox } from "./LeaveSeatConfirmModalBox";
import { MoveSeatConfirmModalBox } from "./MoveSeatConfirmModalBox";
import { MoveSeatSelectModalBox } from "./MoveSeatSelectModalBox";

interface InUseSeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  seat: Seat;
  seatUsage: SeatUsage;
  onLeaveSeatClick: (seat: Seat, seatUsage: SeatUsage) => void;
  onMoveSeatClick: (seat: Seat, seatUsage: SeatUsage) => void;
  onExtendSeatClick: (seat: Seat, seatUsage: SeatUsage) => void;
  seats: Seat[];
}

type InUseSeatModalType =
  | "leaveConfirm"
  | "moveSeatSelect"
  | "moveSeatConfirm"
  | "extendConfirm";

export const SeatModal: React.FC<InUseSeatModalProps> = ({
  isOpen,
  onClose,
  seat,
  seatUsage,
  onLeaveSeatClick,
  onMoveSeatClick,
  onExtendSeatClick,
  seats,
}) => {
  const [modalType, setModalType] = useState<InUseSeatModalType | null>(null);
  const [nextSeat, setNextSeat] = useState<Seat | null>(null);
  const [nextSeatUsage, setNextSeatUsage] = useState<SeatUsage | null>(null);

  const handleClose = () => {
    setModalType(null);
    setNextSeat(null);
    setNextSeatUsage(null);
    onClose();
  };

  const handleLeaveSeatClick = () => {
    onLeaveSeatClick(seat, seatUsage);
    handleClose();
  };

  const handleMoveSeatClick = (nextSeat: Seat) => {
    setModalType("moveSeatConfirm");
    setNextSeat(nextSeat);
    setNextSeatUsage({
      ...seatUsage,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      seatId: nextSeat.id,
    });
  };

  const handleMoveSeatConfirmClick = () => {
    onMoveSeatClick(seat, seatUsage);
    handleClose();
  };

  const handleExtendSeatClick = () => {
    onExtendSeatClick(seat, seatUsage);
    handleClose();
  };

  const renderModalBox = () => {
    if (modalType == "leaveConfirm") {
      return (
        <LeaveSeatConfirmModalBox
          seat={seat}
          seatUsage={seatUsage}
          onClose={handleClose}
          onNextButtonClick={handleLeaveSeatClick}
        />
      );
    } else if (modalType == "moveSeatSelect") {
      return (
        <MoveSeatSelectModalBox
          seatUsage={seatUsage}
          seats={seats}
          onClose={handleClose}
          onNextButtonClick={handleMoveSeatClick}
        />
      );
    } else if (modalType == "moveSeatConfirm") {
      if (nextSeat === null || nextSeatUsage === null) {
        return null;
      }
      return (
        <MoveSeatConfirmModalBox
          nextSeat={nextSeat}
          nextSeatUsage={nextSeatUsage}
          prevSeat={seat}
          onClose={handleClose}
          onNextButtonClick={handleMoveSeatConfirmClick}
        />
      );
    } else if (modalType == "extendConfirm") {
      return (
        <ExtendSeatConfirmModalBox
          seat={seat}
          seatUsage={seatUsage}
          onClose={handleClose}
          onNextButtonClick={handleExtendSeatClick}
        />
      );
    } else {
      return (
        <InUseSeatModalBox
          seat={seat}
          seatUsage={seatUsage}
          onClose={handleClose}
          onExtendSeatClick={() => setModalType("extendConfirm")}
          onLeaveSeatClick={() => setModalType("leaveConfirm")}
          onMoveSeatClick={() => setModalType("moveSeatSelect")}
        />
      );
    }
  };
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="seat-modal">
      {renderModalBox()}
      <div className="modal-backdrop" onClick={handleClose}></div>
    </dialog>
  );
};

export default SeatModal;
