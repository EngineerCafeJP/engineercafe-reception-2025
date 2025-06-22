"use client";

import { FC, useState } from "react";
import { Seat, SeatUsage, SeatWithCategory } from "@/types";
import { AreaBox } from "./AreaBox";
import EmptySeatModal from "./EmptySeatModal";
import InUseSeatModal from "./InUseSeatModal";

type SeatAreaMapProps = {
  seats: SeatWithCategory[];
  seatUsages: SeatUsage[];
  onExtendSeatUsage: (seatUsage: SeatUsage) => void;
  onFinishSeatUsage: (seatUsage: SeatUsage) => void;
  onMoveSeat: (prevSeatUsage: SeatUsage, nextSeatUsage: SeatUsage) => void;
};

export const SeatAreaMap: FC<SeatAreaMapProps> = ({
  seats,
  seatUsages,
  onExtendSeatUsage,
  onFinishSeatUsage,
  onMoveSeat,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedSeatUsage, setSelectedSeatUsage] = useState<SeatUsage | null>(
    null,
  );

  const handleSeatClick = (seat: Seat, seatUsage: SeatUsage | null) => {
    setSelectedSeat(seat);
    setSelectedSeatUsage(seatUsage);
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
      {selectedSeat && selectedSeatUsage ? (
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
      ) : (
        <EmptySeatModal
          isOpen={Boolean(selectedSeat)}
          seat={selectedSeat}
          onClose={() => {
            setSelectedSeat(null);
          }}
        />
      )}
    </div>
  );
};
