"use client";

import React, { useEffect, useState } from "react";
import UserIcon from "@/app/components/icons/UserIcon";
import { Seat, User } from "@/app/types";

interface ReceptionFormProps {
  searchUserList: User[] | null;
  seats: Seat[];
  onChangeUserCode: (userCode: string) => void;
  onClose: () => void;
  onNextButtonClick: (seat: Seat) => void;
}

const ReceptionForm: React.FC<ReceptionFormProps> = ({
  searchUserList,
  seats,
  onChangeUserCode,
  onClose,
  onNextButtonClick,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [userList, setUserList] = useState<User[] | null>(null);

  useEffect(() => {
    setUserList(searchUserList);
  }, [searchUserList]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const areaList = seats
    .map((seat: Seat) => seat.areaName)
    .filter(
      (areaName: string, index: number, self: string[]) =>
        self.indexOf(areaName) === index,
    );

  const seatList = (areaName: string) =>
    seats.filter((seat: Seat) => seat.areaName === areaName);

  const handleClose = () => {
    setSelectedUser(null);
    setSelectedArea(null);
    setSelectedSeat(null);
    setUserList(null);
    onClose();
  };

  return (
    <>
      <div className="absolute z-[100] w-[28rem] bg-[white]">
        <input
          className="input w-full"
          name="code"
          placeholder="会員番号"
          type="text"
          onChange={(e) => onChangeUserCode(e.target.value)}
        />
        {userList && selectedUser === null && (
          <ul className="list bg-base-100 rounded-box my-[0] px-[0] shadow-md">
            {userList.map((user) => (
              <li
                key={user.id}
                className="list-row border-base-300 hover:bg-primary/30 rounded-none border-b p-[0.5rem]"
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
        {selectedUser && (
          <div className="flex flex-col gap-[1rem] p-[1rem] p-[2rem]">
            <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
              <li className="list-row border-base-300 rounded-none border-b p-[0]">
                <div>
                  <UserIcon size={40} />
                </div>
                <div className="flex items-center align-[middle] text-[1.25rem]">
                  <div>{`${selectedUser.code}`}</div>
                </div>
              </li>
            </ul>

            <div className="grid h-[280px] grid-cols-2 gap-[2rem]">
              <div className="h-full overflow-y-auto rounded-lg border p-[0.5rem]">
                <ul className="list bg-base-100 rounded-box my-[0] px-[0] shadow-md">
                  {areaList.map((areaName: string) => (
                    <li
                      key={areaName}
                      className="list-row border-base-300 rounded-none border-b py-[0.5rem]"
                      style={{
                        backgroundColor:
                          selectedArea === areaName
                            ? "var(--color-accent)"
                            : "var(--color-base-100)",
                      }}
                      onClick={() => setSelectedArea(areaName)}
                    >
                      <div>{`${areaName}`}</div>
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
              <button className="btn btn-secondary" onClick={handleClose}>
                閉じる
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
        )}
      </div>
      {(userList || selectedUser) && (
        <div className="modal-backdrop" onClick={handleClose}></div>
      )}
    </>
  );
};

export default ReceptionForm;
