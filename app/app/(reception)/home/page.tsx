"use client";

import React, { useState } from "react";
import {
  useInUseSeatUsages,
  useSeatsWithCategory,
  useSeatUsage,
} from "@/app/(reception)/hooks";
import { useSearchUsers } from "@/app/(reception)/hooks/use-search-users";
import { Seat, SeatUsage, User } from "@/app/types";
import ReceptionForm from "./client-components/ReceptionForm";
import { SeatAreaMap } from "./client-components/SeatAreaMap";

export default function HomePage() {
  const [searchUserKeyword, setSearchUserKeyword] = useState<string>();
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
  } = useSearchUsers(searchUserKeyword);

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

  const onChangeSearch = (searchWord: string) => {
    setSearchUserKeyword(searchWord);
  };

  const isLoading =
    seatsLoading || seatUsagesLoading || seatUsageLoading || usersLoading;

  // TODO エラー表示を作成する
  if (seatsError || seatUsagesError || seatUsageError || usersError) {
    return (
      <div>
        Error:
        {seatsError?.message ||
          seatUsagesError?.message ||
          seatUsageError?.message}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-full">
        <ReceptionForm
          assignSeat={handleAssignSeat}
          searchUserList={users}
          seats={seats}
          onChangeSearchWord={onChangeSearch}
          onClose={() => {}}
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
      {isLoading && (
        <span className="z-index-1000 loading loading-spinner loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
    </>
  );
}
