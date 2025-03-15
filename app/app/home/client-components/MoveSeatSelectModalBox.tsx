import UserIcon from "@/components/icons/UserIcon";

import React, { useState } from "react";
import { Seat, SeatUsage } from "@/app/types";

interface MoveSeatSelectModalBoxProps {
  seatUsage: SeatUsage;
  onClose: () => void;
  onNextButtonClick: (nextSeat: Seat) => void;
  seats: Seat[];
}

export const MoveSeatSelectModalBox: React.FC<MoveSeatSelectModalBoxProps> = ({
  seatUsage,
  onClose,
  onNextButtonClick,
  seats,
}) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const areaList = seats
    .map((seat: Seat) => seat.areaName)
    .filter(
      (areaName: string, index: number, self: string[]) =>
        self.indexOf(areaName) === index
    );
  const seatList = (areaName: string) =>
    seats.filter((seat: Seat) => seat.areaName === areaName);

  return (
    <div className="modal-box p-[0] border-2 border-black">
      <div className="bg-[black] text-[1.25rem] font-[800] text-primary-content h-[50px] flex items-center justify-center">
        座席移動
      </div>
      <div className="p-[1rem] flex flex-col gap-[1rem] p-[2rem]">
        <ul className="list bg-base-100 rounded-box shadow-md px-[0]">
          <li className="list-row border-b rounded-none border-base-300 p-[0]">
            <div>
              <UserIcon size={40} />
            </div>
            <div className="text-[1.25rem] align-[middle] flex items-center">
              <div>{`${seatUsage.userCode}`}</div>
            </div>
          </li>
        </ul>

        <div className="grid grid-cols-2 gap-[2rem] h-[280px]">
          <div className="border rounded-lg p-[0.5rem] h-full overflow-y-auto">
            <ul className="list bg-base-100 rounded-box shadow-md px-[0] my-[0]">
              {areaList.map((areaName: string) => (
                <li
                  className="list-row border-b rounded-none border-base-300 py-[0.5rem]"
                  style={{
                    backgroundColor:
                      selectedArea === areaName ? "var(--color-accent)" : "var(--color-base-100)",
                  }}
                  key={areaName}
                  onClick={() => setSelectedArea(areaName)}
                >
                  <div>{`${areaName}`}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-lg p-[0.5rem] h-full overflow-y-auto">
            <div className="space-y-2 overflow-y-auto ">
              <ul className="list bg-base-100 rounded-box shadow-md px-[0] my-[0]">
                {selectedArea &&
                  seatList(selectedArea).map((seat: Seat) => (
                    <li
                      className="list-row border-b rounded-none border-base-300 py-[0.5rem]"
                      style={{
                        backgroundColor:
                          selectedSeat?.id === seat.id
                            ? "var(--color-accent)" : "var(--color-base-100)",

                      }}
                      key={seat.id}
                      onClick={() => setSelectedSeat(seat)}
                    >
                      <div
                        className="p-2"
                        key={seat.id}
                      >
                        {seat.name}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-around">
          <button className="btn btn-secondary" onClick={onClose}>
            いいえ
          </button>
          <button className="btn btn-primary" onClick={() => onNextButtonClick(selectedSeat!)} disabled={selectedSeat === null}>
            はい
          </button>
        </div>
      </div>
    </div>
  );
};
