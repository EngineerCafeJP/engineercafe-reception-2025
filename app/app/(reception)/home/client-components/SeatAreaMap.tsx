import { FC, useState } from "react";
import { Seat, SeatUsage, SeatWithCategory } from "@/app/types";
import { AreaBox } from "./AreaBox";
import EmptySeatModal from "./EmptySeatModal";
import InUseSeatModal from "./InUseSeatModal";

type SeatAreaMapProps = {
  seats: SeatWithCategory[];
  seatUsages: SeatUsage[];
};

export const SeatAreaMap: FC<SeatAreaMapProps> = ({ seats, seatUsages }) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedSeatUsage, setSelectedSeatUsage] = useState<SeatUsage | null>(
    null,
  );

  const handleSeatClick = (seat: Seat, seatUsage: SeatUsage | null) => {
    setSelectedSeat(seat);
    setSelectedSeatUsage(seatUsage);
  };

  return (
    <div className="m-[1rem]">
      <div className="flex justify-between gap-[0.5rem] overflow-x-auto">
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
          seatUsages={[]}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "MAKERSスペース",
          )}
          onSeatClick={handleSeatClick}
        />
      </div>
      <div className="flex justify-between gap-[0.5rem] overflow-x-auto">
        <AreaBox
          areaName="集中スペース"
          maxCol={3}
          seatUsages={[]}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "集中スペース",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="ミーティングスペース"
          maxCol={3}
          seatUsages={[]}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "ミーティングスペース",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="Underスペース"
          maxCol={3}
          seatUsages={[]}
          seats={seats.filter(
            (seat) => seat.seatCategory.name === "Underスペース",
          )}
          onSeatClick={handleSeatClick}
        />
        <AreaBox
          areaName="テラス"
          maxCol={2}
          seatUsages={[]}
          seats={seats.filter((seat) => seat.seatCategory.name === "テラス")}
          onSeatClick={handleSeatClick}
        />
      </div>
      {selectedSeat && selectedSeatUsage ? (
        <InUseSeatModal
          isOpen={Boolean(selectedSeat)}
          seat={selectedSeat}
          seatUsage={selectedSeatUsage}
          seats={seats}
          onClose={() => {
            setSelectedSeat(null);
          }}
          onExtendSeatClick={() => {}}
          onLeaveSeatClick={() => {}}
          onMoveSeatClick={() => {}}
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
