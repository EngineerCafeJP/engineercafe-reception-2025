"use client";

import React, { useState } from "react";
import {
  useInUseSeatUsages,
  useSeatsWithCategory,
  useSeatUsage,
} from "@/app/(reception)/hooks";
import { SeatUsage, User } from "@/app/types";
import ReceptionForm from "./client-components/ReceptionForm";
import { SeatAreaMap } from "./client-components/SeatAreaMap";

// ダミーデータ
const dummyUserList = [
  {
    id: 1,
    code: "001234",
    name: "山田太郎",
    createdAt: "2025-03-14 10:00:00",
    updatedAt: "2025-03-14 10:00:00",
  },
  {
    id: 2,
    code: "001235",
    name: "山田次郎",
    createdAt: "2025-03-14 10:00:00",
    updatedAt: "2025-03-14 10:00:00",
  },
  {
    id: 3,
    code: "001236",
    name: "山田三郎",
    createdAt: "2025-03-14 10:00:00",
    updatedAt: "2025-03-14 10:00:00",
  },
  {
    id: 4,
    code: "001237",
    name: "山田四郎",
    createdAt: "2025-03-14 10:00:00",
    updatedAt: "2025-03-14 10:00:00",
  },
];

export default function HomePage() {
  const [userList, setUserList] = useState<User[] | null>(null);

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
    isLoading: seatUsageLoading,
    error: seatUsageError,
  } = useSeatUsage();

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

  const onChangeUserCode = (userCode: string) => {
    if (userCode.length === 0) {
      setUserList(null);
      return;
    }

    const users = dummyUserList.filter((user) =>
      user.code.startsWith(userCode),
    );
    setUserList(users);
  };

  // TODO ローディングを作成する
  if (seatsLoading || seatUsagesLoading || seatUsageLoading) {
    return <div>Loading...</div>;
  }

  // TODO エラー表示を作成する
  if (seatsError || seatUsagesError || seatUsageError) {
    return (
      <div>
        Error:{" "}
        {seatsError?.message ||
          seatUsagesError?.message ||
          seatUsageError?.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-full">
      <div className="flex justify-end py-[1rem]">
        <ReceptionForm
          searchUserList={userList}
          seats={seats}
          onChangeUserCode={onChangeUserCode}
          onClose={() => {}}
          onNextButtonClick={() => {}}
        />
      </div>
      <SeatAreaMap
        seatUsages={seatUsages}
        seats={seats}
        onExtendSeatUsage={handleExtendSeatUsage}
        onFinishSeatUsage={handleFinishSeatUsage}
        onMoveSeat={handleMoveSeat}
      />
    </div>
  );
}
