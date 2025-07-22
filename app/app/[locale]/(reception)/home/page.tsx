"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import UserEditModal, {
  UserFormData,
} from "@/[locale]/(reception)/components/UserEditModal";
import { useInUseSeatUsages } from "@/[locale]/(reception)/hooks/use-in-use-seat-usages";
import { useSearchNfc } from "@/[locale]/(reception)/hooks/use-search-nfc";
import { useSearchUsers } from "@/[locale]/(reception)/hooks/use-search-users";
import { useSeatUsage } from "@/[locale]/(reception)/hooks/use-seat-usage";
import { useSeatsWithCategory } from "@/[locale]/(reception)/hooks/use-seats-with-category";
import { useUpdateUser } from "@/[locale]/(reception)/hooks/use-update-user";
import { softDeleteUser } from "@/[locale]/(reception)/queries/users-queries";
import { useRegistrationOptions } from "@/hooks/use-registration-options";
import { Seat, SeatUsage, User } from "@/types";
import ReceptionForm from "./client-components/ReceptionForm";
import { SeatAreaMap } from "./client-components/SeatAreaMap";

export default function HomePage() {
  const searchParams = useSearchParams();
  const searchParamUserId = searchParams.get("userId");
  const userId =
    searchParamUserId != null && /^\d+$/.test(searchParamUserId)
      ? searchParamUserId
      : undefined;
  const [searchUserKeyword, setSearchUserKeyword] = useState<string>("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {
    seats,
    isLoading: seatsLoading,
    error: seatsError,
  } = useSeatsWithCategory();

  const {
    seatUsages,
    isLoading: seatUsagesLoading,
    error: seatUsagesError,
    fetch: fetchInUseSeatUsage,
  } = useInUseSeatUsages();

  const {
    extendSeatUsage,
    finishSeatUsage,
    moveSeat,
    create,
    isLoading: seatUsageLoading,
    error: seatUsageError,
  } = useSeatUsage();

  const {
    users,
    isLoading: usersLoading,
    error: usersError,
    fetch: fetchUsers,
    clear: clearSearchUsers,
  } = useSearchUsers();
  const {
    search: searchNfc,
    error: searchNfcError,
    clearError: clearSearchNfcError,
  } = useSearchNfc();

  const {
    isLoading: isOptionsLoading,
    isError: isOptionsError,
    prefectures,
    belongs,
    jobs,
  } = useRegistrationOptions("ja");

  const {
    update: updateUser,
    isLoading: isUpdateUserLoading,
    error: updateUserError,
  } = useUpdateUser();

  useEffect(() => {
    if (userId != null) {
      setSearchUserKeyword(userId.toString());
      // query string を削除
      const url = new URL(window.location.href);
      url.searchParams.delete("userId");
      window.history.replaceState({}, "", url.toString());
    }
  }, [userId]);

  const handleConnectUsbDevice = () => {
    setSearchUserKeyword("");
  };

  const handleDetectCard = async (cardId: string) => {
    const userId = await searchNfc(cardId);

    if (userId === null) {
      return;
    }

    setSearchUserKeyword(userId.toString());
  };

  const handleChangeSearchWord = useCallback(
    async (searchWord: string) => {
      console.log("searchWord", searchWord);
      if (searchWord === "") {
        clearSearchUsers();
        setSearchUserKeyword("");
      } else {
        setSearchUserKeyword(searchWord);
        await fetchUsers(searchWord);
      }
    },
    [clearSearchUsers, fetchUsers],
  );

  const handleClose = useCallback(() => {
    setSelectedUser(null);
    setEditUser(null);
  }, [setSelectedUser, setEditUser]);

  const handleExtendSeatUsage = useCallback(
    async (seatUsage: SeatUsage) => {
      await extendSeatUsage(seatUsage);
      await fetchInUseSeatUsage();
    },
    [extendSeatUsage, fetchInUseSeatUsage],
  );

  const handleFinishSeatUsage = useCallback(
    async (seatUsage: SeatUsage) => {
      await finishSeatUsage(seatUsage);
      await fetchInUseSeatUsage();
    },
    [finishSeatUsage, fetchInUseSeatUsage],
  );

  const handleMoveSeat = useCallback(
    async (prevSeatUsage: SeatUsage, nextSeatUsage: SeatUsage) => {
      await moveSeat(prevSeatUsage, nextSeatUsage);
      await fetchInUseSeatUsage();
    },
    [moveSeat, fetchInUseSeatUsage],
  );

  const handleAssignSeat = useCallback(
    async (seat: Seat, user: User, startTime?: string) => {
      await create(seat.id, user.id, startTime);
      await fetchInUseSeatUsage();
      handleClose();
    },
    [create, fetchInUseSeatUsage, handleClose],
  );

  const handleUpdateUser = useCallback(
    async (userData: UserFormData) => {
      const updatedUser = await updateUser(userData.id, {
        ...userData,
        prefectureId: Number(userData.prefectureId),
        belongId: Number(userData.belongId),
        jobId: Number(userData.jobId),
      } as Partial<User>);

      if (updatedUser != null) {
        // ユーザー情報を再取得する
        fetchUsers(searchUserKeyword);
        handleClose();
      }
    },
    [updateUser, fetchUsers, searchUserKeyword, handleClose],
  );

  const handleDeleteUser = useCallback(
    async (userId: number) => {
      await softDeleteUser(userId);
      setSearchUserKeyword("");
      setEditUser(null);
      handleClose();
    },
    [setSearchUserKeyword, setEditUser, handleClose],
  );

  const isLoading =
    seatsLoading ||
    seatUsagesLoading ||
    seatUsageLoading ||
    usersLoading ||
    isOptionsLoading ||
    isUpdateUserLoading;

  const error =
    seatsError ??
    seatUsagesError ??
    seatUsageError ??
    usersError ??
    updateUserError;

  // TODO エラー表示を作成する
  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  if (isOptionsError) {
    return <div>Error: パラメーターの取得に失敗しました。</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-full">
        <ReceptionForm
          assignSeat={handleAssignSeat}
          emptySeats={seats.filter(
            (seat) => !seatUsages.some((usage) => usage.seatId === seat.id),
          )}
          searchNfcError={searchUserKeyword ? null : searchNfcError}
          searchUserList={isLoading ? null : users}
          searchWord={searchUserKeyword}
          selectedUser={selectedUser}
          onChangeSearchWord={handleChangeSearchWord}
          onClose={handleClose}
          onConnectUsbDevice={handleConnectUsbDevice}
          onDetectCard={handleDetectCard}
          onDisconnectUsbDevice={clearSearchNfcError}
          onEditUser={setEditUser}
          onSelectUser={setSelectedUser}
        />

        <div className="h-12"></div>
        <SeatAreaMap
          seatUsages={seatUsages}
          seats={seats}
          onExtendSeatUsage={handleExtendSeatUsage}
          onFinishSeatUsage={handleFinishSeatUsage}
          onMoveSeat={handleMoveSeat}
        />
      </div>
      {editUser && prefectures && belongs && jobs && (
        <UserEditModal
          belongs={belongs}
          initialValues={editUser}
          isOpen={Boolean(editUser)}
          jobs={jobs}
          prefectures={prefectures}
          onClose={handleClose}
          onDelete={handleDeleteUser}
          onSave={handleUpdateUser}
        />
      )}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-screen w-screen flex-col items-center bg-black/50">
            <div className="m-auto flex flex-col items-center">
              <span className="loading loading-spinner loading-xl"></span>
              <span className="text-white">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
