"use client";

import React, { useEffect, useState } from "react";
import { Seat, User } from "@/app/types";
import UserIcon from "@/components/icons/UserIcon";

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
        self.indexOf(areaName) === index
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
      <div className="w-[28rem] absolute bg-[white] z-[100]">
        <input
          type="text"
          name="code"
          className="input w-full"
          placeholder="会員番号"
          onChange={(e) => onChangeUserCode(e.target.value)}
        />
        {userList && selectedUser === null && (
          <ul className="list bg-base-100 rounded-box shadow-md px-[0] my-[0]">
            {userList.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="list-row border-b rounded-none border-base-300 p-[0.5rem] hover:bg-primary/30"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
        {selectedUser && (
          <div className="p-[1rem] flex flex-col gap-[1rem] p-[2rem]">
            <ul className="list bg-base-100 rounded-box shadow-md px-[0]">
              <li className="list-row border-b rounded-none border-base-300 p-[0]">
                <div>
                  <UserIcon size={40} />
                </div>
                <div className="text-[1.25rem] align-[middle] flex items-center">
                  <div>{`${selectedUser.code}`}</div>
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
                          selectedArea === areaName
                            ? "var(--color-accent)"
                            : "var(--color-base-100)",
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
                                ? "var(--color-accent)"
                                : "var(--color-base-100)",
                          }}
                          key={seat.id}
                          onClick={() => setSelectedSeat(seat)}
                        >
                          <div className="p-2" key={seat.id}>
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
                onClick={() => onNextButtonClick(selectedSeat!)}
                disabled={selectedSeat === null}
              >
                はい
              </button>
            </div>
          </div>
        )}
      </div>
      {(userList || selectedUser) && <div className="modal-backdrop" onClick={handleClose}></div>}
    </>
  );
};

export default ReceptionForm;
