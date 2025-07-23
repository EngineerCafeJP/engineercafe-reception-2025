"use client";

import { FC, useState } from "react";
import AssignSeatConfirmModal from "@/[locale]/(reception)/home/client-components/AssignSeatConfirmModal";
import { Seat, SeatUsage, SeatWithCategory, User } from "@/types";
import { AreaBox } from "./AreaBox";
import EmptySeatModal from "./EmptySeatModal";
import InUseSeatModal from "./InUseSeatModal";

type SeatAreaMapProps = {
  seats: SeatWithCategory[];
  seatUsages: SeatUsage[];
  searchUserList: User[] | null;
  onExtendSeatUsage: (seatUsage: SeatUsage) => void;
  onFinishSeatUsage: (seatUsage: SeatUsage) => void;
  onMoveSeat: (prevSeatUsage: SeatUsage, nextSeatUsage: SeatUsage) => void;
  onAssignSeat: (seat: Seat, user: User, startTime?: string) => void;
};

export const SeatAreaMap: FC<SeatAreaMapProps> = ({
  seats,
  seatUsages,
  searchUserList,
  onExtendSeatUsage,
  onFinishSeatUsage,
  onMoveSeat,
  onAssignSeat,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedSeatUsage, setSelectedSeatUsage] = useState<SeatUsage | null>(
    null,
  );

  const handleSeatClick = (seat: Seat, seatUsage: SeatUsage | null) => {
    setSelectedSeat(seat);
    setSelectedSeatUsage(seatUsage);
  };

  const handleAssignSeat = (seat: Seat, user: User, startTime?: string) => {
    onAssignSeat(seat, user, startTime);
    setSelectedSeat(null);
    setSelectedSeatUsage(null);
  };

  const renderSeatModal = () => {
    if (selectedSeat == null) {
      return <></>;
    }

    if (selectedSeat)
      if (selectedSeatUsage) {
        return (
          <InUseSeatModal
            emptySeats={seats.filter(
              (seat) => !seatUsages.some((usage) => usage.seatId === seat.id),
            )}
            isOpen={Boolean(selectedSeat)}
            seat={selectedSeat}
            seatUsage={selectedSeatUsage}
            seats={seats}
            onClose={() => {
              setSelectedSeat(null);
              setSelectedSeatUsage(null);
            }}
            onExtendSeatUsage={onExtendSeatUsage}
            onFinishSeatUsage={onFinishSeatUsage}
            onMoveSeat={onMoveSeat}
          />
        );
      } else if (searchUserList && searchUserList.length === 1) {
        return (
          <AssignSeatConfirmModal
            isOpen={Boolean(selectedSeat)}
            seat={selectedSeat}
            user={searchUserList[0]}
            onAssignSeat={(startTime: string) =>
              handleAssignSeat(selectedSeat, searchUserList[0], startTime)
            }
            onClose={() => {
              setSelectedSeat(null);
            }}
          />
        );
      } else {
        return (
          <EmptySeatModal
            isOpen={Boolean(selectedSeat)}
            seat={selectedSeat}
            onClose={() => {
              setSelectedSeat(null);
            }}
          />
        );
      }
  };

  return (
    <div className="m-[1rem] mx-auto w-fit">
      <div className="mx-auto flex gap-4 overflow-x-auto">
        <AreaBox
          areaName="メインホール"
          maxCol={10}
          seatUsages={seatUsages}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "メインホール",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="MAKERSスペース"
          maxCol={2}
          seatUsages={seatUsages}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "MAKERSスペース",
          )}
          onSeatClick={handleSeatClick}
        />
      </div>
      <div className="mx-auto flex gap-4 overflow-x-auto">
        <AreaBox
          areaName="集中スペース"
          maxCol={3}
          seatUsages={seatUsages}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "集中スペース",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="ミーティングスペース"
          maxCol={3}
          seatUsages={seatUsages}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "ミーティングスペース",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="Underスペース"
          maxCol={3}
          seatUsages={seatUsages}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "Underスペース",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="テラス"
          maxCol={2}
          seatUsages={seatUsages}
          seats={seats.filter((seat) => seat.seatCategory.name === "テラス")}
          onSeatClick={handleSeatClick}
        />
      </div>
      {renderSeatModal()}
    </div>
  );
};
