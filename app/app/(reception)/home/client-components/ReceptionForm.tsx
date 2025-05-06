"use client";

import React, { useState } from "react";
import { MdClose, MdComment, MdWarning } from "react-icons/md";
import AssignSeatConfirmModal from "@/app/(reception)/home/client-components/AssignSeatConfirmModal";
import CardReaderControlButton from "@/app/components/CardReaderControlButton";
import UserIcon from "@/app/components/icons/UserIcon";
import { Seat, User } from "@/app/types";

interface ReceptionFormProps {
  searchWord: string;
  searchUserList: User[] | null;
  searchNfcError: string | null;
  emptySeats: Seat[];
  onChangeSearchWord: (input: string) => void;
  onClose: () => void;
  onDetectCard: (cardId: string) => void;
  onDisconnectUsbDevice: () => void;
  assignSeat: (seat: Seat, user: User) => void;
  onEditUser: (user: User) => void;
}

const ReceptionForm: React.FC<ReceptionFormProps> = ({
  searchWord,
  searchUserList,
  searchNfcError,
  emptySeats,
  onChangeSearchWord,
  onClose,
  onDetectCard,
  onDisconnectUsbDevice,
  assignSeat,
  onEditUser,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const selectedUser = searchUserList?.find(
    (user) => user.id === selectedUserId,
  );

  const handleSelectUser = (user: User) => {
    setSelectedUserId(user.id);
  };

  const areaList = emptySeats
    .map((seat: Seat) => seat.seatCategory.name)
    .filter(
      (categoryName: string, index: number, self: string[]) =>
        self.indexOf(categoryName) === index,
    );

  const seatList = (categoryName: string) =>
    emptySeats.filter((seat: Seat) => seat.seatCategory.name === categoryName);

  const handleChangeSearchWord = (word: string) => {
    onChangeSearchWord(word);
  };

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    setSelectedSeat(null);
  };

  const handleAssignSeat = async () => {
    await assignSeat(selectedSeat!, selectedUser!);
    handleClose();
  };

  const handleClose = () => {
    handleChangeSearchWord("");
    setSelectedUserId(null);
    setSelectedArea(null);
    setSelectedSeat(null);
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleDetectCard = (cardId: string) => {
    onDetectCard(cardId);
  };

  const handleDisconnectUsbDevice = () => {
    onDisconnectUsbDevice();
  };

  const handleEditUser = (user: User) => {
    onEditUser(user);
  };

  return (
    <>
      <div className="absolute right-0 z-[100]">
        <div className="bg-base-200 w-2xl px-4 py-2">
          <div className="flex justify-between">
            <CardReaderControlButton
              onDetectCard={handleDetectCard}
              onDisconnectUsbDevice={handleDisconnectUsbDevice}
            />
            <label className="input" htmlFor="code">
              <input
                name="code"
                placeholder="会員番号"
                type="text"
                value={searchWord}
                onChange={(e) => handleChangeSearchWord(e.target.value)}
              />
              {searchWord && (
                <button className="cursor-pointer" onClick={handleClose}>
                  <MdClose size={24} />
                </button>
              )}
            </label>
          </div>
          {searchNfcError && (
            <span className="text-error text-xs">{searchNfcError}</span>
          )}
          {searchUserList && !selectedUser && (
            <ul className="list bg-base-100 my-1 rounded-none px-1">
              {searchUserList.map((user) => (
                <li
                  key={user.id}
                  className="list-row border-base-300 hover:border-base-300/30 rounded-none border-b p-[0.5rem]"
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
                <li
                  className="list-row rounded-4 hover:bg-base-300/30 border p-[0]"
                  onClick={() => handleEditUser(selectedUser)}
                >
                  <div className="m-auto">
                    <UserIcon size={40} />
                  </div>
                  <div className="items-center align-[middle] text-[1.25rem]">
                    <div>id: {`${selectedUser.id}`}</div>
                    <div>name: {`${selectedUser.name}`}</div>
                  </div>
                  {selectedUser.comments && (
                    <div className="text-warning m-1 flex items-center">
                      <MdComment className="mr-1" size={20} />
                    </div>
                  )}
                  {selectedUser.warnings && (
                    <div className="text-error m-1 flex items-center">
                      <MdWarning className="mr-1" size={20} />
                    </div>
                  )}
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
      {searchUserList && !selectedUser && (
        <div
          className="modal-backdrop fixed inset-0 z-[1] h-screen w-screen"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default ReceptionForm;
