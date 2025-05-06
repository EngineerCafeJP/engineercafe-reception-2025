"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import UserEditModal, {
  UserFormData,
} from "@/app/(reception)/components/UserEditModal";
import {
  useInUseSeatUsages,
  useSearchNfc,
  useSeatsWithCategory,
  useSeatUsage,
} from "@/app/(reception)/hooks";
import { useSearchUsers } from "@/app/(reception)/hooks/use-search-users";
import { useUpdateUser } from "@/app/(reception)/hooks/use-update-user";
import { useRegistrationOptions } from "@/app/(registration)/registration/hooks/use-registration-options";
import { Seat, SeatUsage, User } from "@/app/types";
import ReceptionForm from "./client-components/ReceptionForm";
import { SeatAreaMap } from "./client-components/SeatAreaMap";

export default function HomePage() {
  const [searchUserKeyword, setSearchUserKeyword] = useState<string>("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [debouncedChangeSearchWord] = useDebounce(searchUserKeyword, 500);
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
  } = useSearchUsers(debouncedChangeSearchWord);
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

  const handleDetectCard = async (cardId: string) => {
    const userId = await searchNfc(cardId);

    if (userId === null) {
      setSearchUserKeyword("");
      return;
    }

    setSearchUserKeyword(userId.toString());
  };

  const handleChangeSearchWord = (searchWord: string) => {
    setSearchUserKeyword(searchWord);
  };

  const handleExtendSeatUsage = async (seatUsage: SeatUsage) => {
    await extendSeatUsage(seatUsage);
    await fetchInUseSeatUsage();
  };

  const handleFinishSeatUsage = async (seatUsage: SeatUsage) => {
    await finishSeatUsage(seatUsage);
    await fetchInUseSeatUsage();
  };

  const handleMoveSeat = async (
    prevSeatUsage: SeatUsage,
    nextSeatUsage: SeatUsage,
  ) => {
    await moveSeat(prevSeatUsage, nextSeatUsage);
    await fetchInUseSeatUsage();
  };

  const handleAssignSeat = async (seat: Seat, user: User) => {
    await create(seat.id, user.id);
    await fetchInUseSeatUsage();
  };

  const handleUpdateUser = async (userData: UserFormData) => {
    const updatedUser = await updateUser(userData.id, {
      ...userData,
      prefectureId: Number(userData.prefectureId),
      belongId: Number(userData.belongId),
      jobId: Number(userData.jobId),
    } as Partial<User>);

    if (updatedUser != null) {
      // ユーザー情報を再取得する
      fetchUsers(searchUserKeyword);
    }
  };

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
          searchNfcError={searchNfcError}
          searchUserList={users}
          searchWord={searchUserKeyword}
          onChangeSearchWord={handleChangeSearchWord}
          onClose={() => {}}
          onDetectCard={handleDetectCard}
          onDisconnectUsbDevice={clearSearchNfcError}
          onEditUser={setEditUser}
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
          onClose={() => setEditUser(null)}
          onSave={handleUpdateUser}
        />
      )}
      {isLoading && (
        <span className="z-index-1000 loading loading-spinner loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
    </>
  );
}
