"use client";

import React, { useState } from "react";
import { Seat, SeatUsage } from "@/types";
import { addMinutes } from "@/utils/format-time";
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
  onFinishSeatUsage: (seatUsage: SeatUsage) => void;
  onMoveSeat: (prevSeatUsage: SeatUsage, nextSeatUsage: SeatUsage) => void;
  onExtendSeatUsage: (seatUsage: SeatUsage) => void;
  seats: Seat[];
  emptySeats: Seat[];
}

type InUseSeatModalType =
  | "leaveConfirm"
  | "moveSeatSelect"
  | "moveSeatConfirm"
  | "extendConfirm";

export const InUseSeatModal: React.FC<InUseSeatModalProps> = ({
  isOpen,
  onClose,
  seat,
  seatUsage,
  onFinishSeatUsage,
  onMoveSeat,
  onExtendSeatUsage,
  seats,
  emptySeats,
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
    onFinishSeatUsage(seatUsage);
    handleClose();
  };

  const handleMoveSeatClick = (nextSeat: Seat) => {
    setModalType("moveSeatConfirm");
    setNextSeat(nextSeat);
    setNextSeatUsage({
      ...seatUsage,
      startTime: new Date().toISOString(),
      usageDurationMinutes: nextSeat.usageDurationMinutes,
      endTime: null,
      seatId: nextSeat.id,
    });
  };

  const handleMoveSeatConfirmClick = () => {
    if (nextSeatUsage == null) return;

    onMoveSeat(seatUsage, nextSeatUsage);
    handleClose();
  };

  const handleExtendSeatUsage = () => {
    if (nextSeatUsage == null) return;

    onExtendSeatUsage(nextSeatUsage);
    handleClose();
  };

  const handleChangeNextSeatUsage = (nextSeatUsage: SeatUsage) => {
    setNextSeatUsage(nextSeatUsage);
  };

  const handleExtendSeatClicked = () => {
    setNextSeatUsage({
      ...seatUsage,
      startTime: addMinutes(
        seatUsage.startTime,
        seatUsage.usageDurationMinutes,
      ),
      usageDurationMinutes: seat.usageDurationMinutes,
      endTime: null,
    });
    setModalType("extendConfirm");
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
          emptySeats={emptySeats}
          seatUsage={seatUsage}
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
          onChangeNextSeatUsage={handleChangeNextSeatUsage}
          onClose={handleClose}
          onNextButtonClick={handleMoveSeatConfirmClick}
        />
      );
    } else if (modalType == "extendConfirm") {
      if (nextSeatUsage == null) return null;

      return (
        <ExtendSeatConfirmModalBox
          nextSeatUsage={nextSeatUsage}
          seat={seat}
          seatUsage={seatUsage}
          onChangeNextSeatUsage={handleChangeNextSeatUsage}
          onClose={handleClose}
          onNextButtonClick={handleExtendSeatUsage}
        />
      );
    } else {
      return (
        <InUseSeatModalBox
          seat={seat}
          seatUsage={seatUsage}
          onClose={handleClose}
          onExtendSeatClick={() => handleExtendSeatClicked()}
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

export default InUseSeatModal;
