
import { FC, useState } from 'react';
import { AreaBox } from './AreaBox';
import { Seat, SeatUsage } from '@/app/types';
import InUseSeatModal from './InUseSeatModal';
import EmptySeatModal from './EmptySeatModal';

type SeatAreaMapProps = {
  seats: Seat[];
  seatUsages: SeatUsage[];
};

export const SeatAreaMap: FC<SeatAreaMapProps> = ({ seats, seatUsages }) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedSeatUsage, setSelectedSeatUsage] = useState<SeatUsage | null>(
    null
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
            seats={seats.filter((seat) => seat.areaName === "メインホール")}
            seatUsages={seatUsages}
            onSeatClick={handleSeatClick}
          />
          <AreaBox
            areaName="MAKERSスペース"
            maxCol={2}
            seats={seats.filter((seat) => seat.areaName === "MAKERSスペース")}
            seatUsages={[]}
            onSeatClick={handleSeatClick}
          />
        </div>
        <div className="flex justify-between gap-[0.5rem] overflow-x-auto">
          <AreaBox
            areaName="集中スペース"
            maxCol={3}
            seats={seats.filter((seat) => seat.areaName === "集中スペース")}
            seatUsages={[]}
            onSeatClick={handleSeatClick}
          />
          <AreaBox
            areaName="ミーティングスペース"
            maxCol={3}
            seats={seats.filter((seat) => seat.areaName === "ミーティングスペース")}
            seatUsages={[]}
            onSeatClick={handleSeatClick}
          />
          <AreaBox
            areaName="Underペース"
            maxCol={3}
            seats={seats.filter((seat) => seat.areaName === "UNDERスペース")}
            seatUsages={[]}
            onSeatClick={handleSeatClick}
          />
          <AreaBox
            areaName="テラス"
            maxCol={2}
            seats={seats.filter((seat) => seat.areaName === "テラス")}
            seatUsages={[]}
            onSeatClick={handleSeatClick}
          />
        </div>
        {selectedSeat && selectedSeatUsage ? (
          <InUseSeatModal
            isOpen={Boolean(selectedSeat)}
            onClose={() => {
              setSelectedSeat(null);
            }}
            seat={selectedSeat}
            seatUsage={selectedSeatUsage}
            onLeaveSeatClick={() => {}}
            onMoveSeatClick={() => {}}
            onExtendSeatClick={() => {}}
            seats={seats}
          />
        ) : (
          <EmptySeatModal
            isOpen={Boolean(selectedSeat)}
            onClose={() => {
              setSelectedSeat(null);
            }}
            seat={selectedSeat}
          />
        )}
      </div>
  )
}