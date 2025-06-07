"use client";

import React, { useState } from "react";
import { useKey } from "react-use";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, SeatUsage } from "@/types";

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

  useKey("Escape", onClose, undefined, [onClose]);
  useKey(
    "Enter",
    () => {
      if (selectedSeat) {
        onNextButtonClick(selectedSeat);
      }
    },
    undefined,
    [onNextButtonClick, selectedSeat],
  );

  const areaList = seats
    .map((seat: Seat) => seat.seatCategory.name)
    .filter(
      (seatCategoryName: string, index: number, self: string[]) =>
        self.indexOf(seatCategoryName) === index,
    );
  const seatList = (seatCategoryName: string) =>
    seats.filter((seat: Seat) => seat.seatCategory.name === seatCategoryName);

  return (
    <div className="modal-box border-2 border-black p-[0]">
      <div className="text-primary-content flex h-[50px] items-center justify-center bg-[black] text-[1.25rem] font-[800]">
        座席移動
      </div>
      <div className="flex flex-col gap-[1rem] p-[2rem]">
        <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
          <li className="list-row border-base-300 rounded-none border-b p-[0]">
            <div>
              <UserIcon size={40} />
            </div>
            <div className="flex items-center align-[middle] text-[1.25rem]">
              <div>{`${seatUsage.userId}`}</div>
            </div>
          </li>
        </ul>

        <div className="grid h-[280px] grid-cols-2 gap-[2rem]">
          <div className="h-full overflow-y-auto rounded-lg border p-[0.5rem]">
            <ul className="list bg-base-100 rounded-box my-[0] px-[0] shadow-md">
              {areaList.map((seatCategoryName: string) => (
                <li
                  key={seatCategoryName}
                  className="list-row border-base-300 rounded-none border-b py-[0.5rem]"
                  style={{
                    backgroundColor:
                      selectedArea === seatCategoryName
                        ? "var(--color-accent)"
                        : "var(--color-base-100)",
                  }}
                  onClick={() => setSelectedArea(seatCategoryName)}
                >
                  <div>{`${seatCategoryName}`}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full overflow-y-auto rounded-lg border p-[0.5rem]">
            <div className="space-y-2 overflow-y-auto">
              <ul className="list bg-base-100 rounded-box my-[0] px-[0] shadow-md">
                {selectedArea &&
                  seatList(selectedArea).map((seat: Seat) => (
                    <li
                      key={seat.id}
                      className="list-row border-base-300 rounded-none border-b py-[0.5rem]"
                      style={{
                        backgroundColor:
                          selectedSeat?.id === seat.id
                            ? "var(--color-accent)"
                            : "var(--color-base-100)",
                      }}
                      onClick={() => setSelectedSeat(seat)}
                    >
                      <div key={seat.id} className="p-2">
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
          <button
            className="btn btn-primary"
            disabled={selectedSeat === null}
            onClick={() => onNextButtonClick(selectedSeat!)}
          >
            はい
          </button>
        </div>
      </div>
    </div>
  );
};
