"use client";

import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import AssignSeatConfirmModal from "@/app/(reception)/home/client-components/AssignSeatConfirmModal";
import UserIcon from "@/app/components/icons/UserIcon";
import { Seat, User } from "@/app/types";

interface ReceptionFormProps {
  searchUserList: User[] | null;
  seats: Seat[];
  onChangeSearchWord: (input: string) => void;
  onClose: () => void;
  assignSeat: (seat: Seat, user: User) => void;
}

const ReceptionForm: React.FC<ReceptionFormProps> = ({
  searchUserList,
  seats,
  onChangeSearchWord,
  onClose,
  assignSeat,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [userList, setUserList] = useState<User[] | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const debouncedChangeSearchWord = useDebouncedCallback((word: string) => {
    onChangeSearchWord(word);
  }, 500);

  useEffect(() => {
    setUserList(searchUserList);
  }, [searchUserList]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const areaList = seats
    .map((seat: Seat) => seat.seatCategory.name)
    .filter(
      (categoryName: string, index: number, self: string[]) =>
        self.indexOf(categoryName) === index,
    );

  const seatList = (categoryName: string) =>
    seats.filter((seat: Seat) => seat.seatCategory.name === categoryName);

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    setSelectedSeat(null);
  };

  const handleAssignSeat = async () => {
    await assignSeat(selectedSeat!, selectedUser!);
    handleClose();
  };

  const handleClose = () => {
    setSelectedUser(null);
    setSelectedArea(null);
    setSelectedSeat(null);
    setUserList(null);
    setIsConfirmModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="absolute right-0 z-[100] flex justify-end">
        <div className="bg-base-200 w-[32rem] px-[1rem] py-2">
          <div className="mb-2 flex justify-between gap-[1rem]">
            <input
              className="input w-full"
              name="code"
              placeholder="会員番号"
              type="text"
              onChange={(e) => debouncedChangeSearchWord(e.target.value)}
            />
            <button className="btn btn-outline" onClick={handleClose}>
              X
            </button>
          </div>
          {userList && selectedUser === null && (
            <ul className="list bg-base-100 my-1 rounded-none px-1">
              {userList.map((user) => (
                <li
                  key={user.id}
                  className="list-row border-base-300 hover:bg-primary/30 rounded-none border-b p-[0.5rem]"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-16 text-sm font-bold">{user.id}</div>
                    <div className="text-sm">{user.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {selectedUser && (
            <div className="mt-8 flex flex-col gap-[1rem]">
              <ul className="list bg-base-100 rounded-box px-1">
                <li className="list-row rounded-4 border p-[0]">
                  <div className="m-auto">
                    <UserIcon size={40} />
                  </div>
                  <div className="items-center align-[middle] text-[1.25rem]">
                    <div>id: {`${selectedUser.id}`}</div>
                    <div>name: {`${selectedUser.name}`}</div>
                  </div>
                </li>
              </ul>

              <div className="grid grid-cols-2 gap-[2rem]">
                <div className="flex h-120 flex-col gap-[1rem]">
                  <div className="text-sm font-bold">エリア</div>
                  <div className="h-full overflow-y-auto rounded-lg border bg-white p-[0.5rem]">
                    <ul className="list bg-base-100 rounded-box my-[0] px-[0]">
                      {areaList.map((categoryName: string) => (
                        <li
                          key={categoryName}
                          className="list-row border-base-300 rounded-none border-b px-2 py-3"
                          style={{
                            backgroundColor:
                              selectedArea === categoryName
                                ? "var(--color-accent)"
                                : "var(--color-base-100)",
                          }}
                          onClick={() => handleSelectArea(categoryName)}
                        >
                          <div>{`${categoryName}`}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex h-120 flex-col gap-[1rem]">
                  <div className="text-sm font-bold">座席</div>
                  <div className="h-full overflow-y-auto rounded-lg border bg-white p-1">
                    <ul className="list bg-base-100 rounded-box my-[0] px-[0]">
                      {selectedArea &&
                        seatList(selectedArea).map((seat: Seat) => (
                          <li
                            key={seat.id}
                            className="list-row border-base-300 rounded-none border-b px-2 py-3"
                            style={{
                              backgroundColor:
                                selectedSeat?.id === seat.id
                                  ? "var(--color-accent)"
                                  : "var(--color-base-100)",
                            }}
                            onClick={() => setSelectedSeat(seat)}
                          >
                            <div key={seat.id}>{seat.name}</div>
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
                  onClick={() => setIsConfirmModalOpen(true)}
                >
                  受付する
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedSeat && selectedUser && (
        <AssignSeatConfirmModal
          isOpen={isConfirmModalOpen}
          seat={selectedSeat}
          user={selectedUser}
          onAssignSeat={handleAssignSeat}
          onClose={() => setIsConfirmModalOpen(false)}
        />
      )}
      {(userList || selectedUser) && (
        <div
          className="modal-backdrop fixed inset-0 z-[1] h-screen w-screen"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default ReceptionForm;
