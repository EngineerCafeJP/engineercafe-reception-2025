"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MdClose,
  MdComment,
  MdEdit,
  MdSearch,
  MdWarning,
} from "react-icons/md";
import { useKey } from "react-use";
import { useDebounce } from "use-debounce";
import CardReaderControlButton from "@/[locale]/(reception)/components/CardReaderControlButton";
import AssignSeatConfirmModal from "@/[locale]/(reception)/home/client-components/AssignSeatConfirmModal";
import UserIcon from "@/components/icons/UserIcon";
import { Seat, User } from "@/types";

interface ReceptionFormProps {
  searchWord: string;
  searchUserList: User[] | null;
  searchNfcError: string | null;
  emptySeats: Seat[];
  selectedUser: User | null;
  onSelectUser: (user: User | null) => void;
  onChangeSearchWord: (input: string) => void;
  onClose: () => void;
  onConnectUsbDevice: () => void;
  onDetectCard: (cardId: string) => void;
  onDisconnectUsbDevice: () => void;
  assignSeat: (seat: Seat, user: User, startTime?: string) => void;
  onEditUser: (user: User) => void;
}

const ReceptionForm: React.FC<ReceptionFormProps> = ({
  searchWord,
  searchUserList,
  searchNfcError,
  emptySeats,
  selectedUser,
  onSelectUser,
  onChangeSearchWord,
  onClose,
  onConnectUsbDevice,
  onDetectCard,
  onDisconnectUsbDevice,
  assignSeat,
  onEditUser,
}) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [searchFormValue, setSearchFormValue] = useState<string>(searchWord);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const [debouncedChangeSearchWord] = useDebounce(searchFormValue, 250);

  // インクリメンタルサーチ
  useEffect(() => {
    onChangeSearchWord(debouncedChangeSearchWord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedChangeSearchWord]);

  // TODO リファクタリング
  useEffect(() => {
    setSearchFormValue(searchWord);
  }, [searchWord]);

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
  };

  const areaList = React.useMemo(() => {
    const categories = emptySeats.map((seat: Seat) => seat.seatCategory);

    return categories
      .sort((a, b) => a.order - b.order)
      .map((category) => category.name)
      .filter(
        (categoryName: string, index: number, self: string[]) =>
          self.indexOf(categoryName) === index,
      );
  }, [emptySeats]);

  const seatList = (categoryName: string) =>
    emptySeats.filter((seat: Seat) => seat.seatCategory.name === categoryName);

  const handleChangeSearchWord = (word: string) => {
    setSearchFormValue(word);
  };

  const handleSearch = useCallback(() => {
    onSelectUser(null);
    onChangeSearchWord(searchFormValue);
  }, [onSelectUser, onChangeSearchWord, searchFormValue]);

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    setSelectedSeat(null);
  };

  const handleAssignSeat = async (
    seat: Seat,
    user: User,
    startTime?: string,
  ) => {
    if (seat && user) {
      await assignSeat(seat, user, startTime);
      setSearchFormValue("");
      handleClose();
    }
  };

  const handleClearSearch = () => {
    setSearchFormValue("");
    handleClose();
  };

  const handleClose = () => {
    setSelectedUserIndex(0);
    setSelectedArea(null);
    setSelectedSeat(null);
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleConnectUsbDevice = () => {
    onConnectUsbDevice();
  };

  const handleDetectCard = (cardId: string) => {
    onDetectCard(cardId);
  };

  const handleDisconnectUsbDevice = () => {
    onDisconnectUsbDevice();
  };

  const handleEditUser = (userId: number) => {
    const user = searchUserList?.find((user) => user.id === userId);
    if (!user) {
      console.error("ユーザーが見つかりません");
      return;
    }
    onEditUser(user);
  };

  const handleEnterKeyDown = useCallback(
    (_e: KeyboardEvent) => {
      if (
        searchFormValue &&
        selectedUser == null &&
        (searchUserList == null || searchUserList.length === 0)
      ) {
        handleSearch();
      } else if (
        confirmButtonRef.current?.disabled === false &&
        selectedUser !== null
      ) {
        setIsConfirmModalOpen(true);
      } else if (
        searchUserList &&
        selectedUser == null &&
        searchUserList.length > 0
      ) {
        onSelectUser(searchUserList[selectedUserIndex]);
      }
    },
    [
      searchFormValue,
      selectedUser,
      searchUserList,
      handleSearch,
      onSelectUser,
      selectedUserIndex,
    ],
  );

  const handleArrowDownKeyDown = useCallback(
    (_e: KeyboardEvent) => {
      if (searchUserList && selectedUser === null) {
        if (selectedUserIndex < searchUserList.length - 1) {
          setSelectedUserIndex(selectedUserIndex + 1);
        }
      }
    },
    [selectedUserIndex, searchUserList, selectedUser],
  );

  const handleArrowUpKeyDown = useCallback(
    (_e: KeyboardEvent) => {
      if (searchUserList && selectedUser === null) {
        if (selectedUserIndex > 0) {
          setSelectedUserIndex(selectedUserIndex - 1);
        }
      }
    },
    [selectedUserIndex, searchUserList, selectedUser],
  );

  useKey("Enter", handleEnterKeyDown, undefined, [
    selectedUser,
    handleEnterKeyDown,
    searchUserList,
    selectedUserIndex,
  ]);

  useKey("Escape", handleClose, undefined, [selectedUser, handleClose]);

  useKey("ArrowUp", handleArrowUpKeyDown, undefined, [
    selectedUserIndex,
    searchUserList,
    selectedUser,
    handleArrowUpKeyDown,
  ]);

  useKey("ArrowDown", handleArrowDownKeyDown, undefined, [
    selectedUserIndex,
    searchUserList,
    selectedUser,
    handleArrowDownKeyDown,
  ]);

  return (
    <>
      <div className="absolute right-0 z-[100]">
        <div className="bg-base-200 w-2xl px-4 py-2">
          <div className="flex items-center justify-between">
            <CardReaderControlButton
              onConnectUsbDevice={handleConnectUsbDevice}
              onDetectCard={handleDetectCard}
              onDisconnectUsbDevice={handleDisconnectUsbDevice}
            />
            <label className="input" htmlFor="code">
              <input
                autoComplete="off"
                name="code"
                placeholder="会員番号"
                type="text"
                value={searchFormValue}
                onChange={(e) => handleChangeSearchWord(e.target.value)}
              />
              {searchFormValue && (
                <button className="cursor-pointer" onClick={handleClearSearch}>
                  <MdClose size={24} />
                </button>
              )}
            </label>
            <button className="btn btn-sm btn-primary" onClick={handleSearch}>
              <MdSearch size={24} />
            </button>
          </div>
          {searchNfcError && (
            <span className="text-error text-xs">{searchNfcError}</span>
          )}
          {searchFormValue !== "" &&
            searchWord !== "" &&
            searchUserList &&
            searchUserList.length === 0 &&
            selectedUser == null && (
              <span className="text-error text-xs">
                会員番号が見つかりません
              </span>
            )}
          {searchUserList && selectedUser === null && (
            <ul className="list bg-base-100 my-1 rounded-none px-1">
              {searchUserList.map((user, index) => (
                <li
                  key={user.id}
                  className="list-row border-base-300 hover:border-base-300/30 cursor-pointer rounded-none border-b p-[0.5rem]"
                  style={{
                    backgroundColor:
                      selectedUserIndex === index
                        ? "var(--color-accent)"
                        : "var(--color-base-100)",
                  }}
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-16 text-sm font-bold">{user.id}</div>
                    <div className="text-sm">{user.name}</div>
                    <div className="ml-2 text-sm">({user.pronunciation})</div>
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
                    <div>id: {`${selectedUser?.id}`}</div>
                    <div>
                      name: {`${selectedUser?.name}`}
                      <small className="ml-2">
                        ({`${selectedUser?.pronunciation}`})
                      </small>
                    </div>
                  </div>
                  {selectedUser?.comments && (
                    <div className="text-warning m-1 flex items-center">
                      <MdComment className="mr-1" size={20} />
                    </div>
                  )}
                  {selectedUser?.warnings && (
                    <div className="text-error m-1 flex items-center">
                      <MdWarning className="mr-1" size={20} />
                    </div>
                  )}
                  <div className="flex justify-end pe-2">
                    <button
                      className="btn btn-sm btn-primary m-auto"
                      onClick={() => handleEditUser(selectedUser.id)}
                    >
                      <MdEdit size={20} />
                    </button>
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
                  ref={confirmButtonRef}
                  className="btn btn-primary"
                  disabled={selectedSeat === null}
                  id="confirm-button"
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
          onAssignSeat={(startTime: string) =>
            handleAssignSeat(selectedSeat, selectedUser, startTime)
          }
          onClose={() => setIsConfirmModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReceptionForm;
