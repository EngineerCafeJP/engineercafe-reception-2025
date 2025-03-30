"use client";

import React, { useState } from "react";
import { useGetSeatsWithCategory } from "@/app/(reception)/hooks";
import { useGetInUseSeatUsages } from "@/app/(reception)/hooks/use-get-in-use-seat-usages";
import { User } from "@/app/types";
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
  } = useGetSeatsWithCategory();
  const {
    seatUsages,
    isLoading: seatUsagesLoading,
    error: seatUsagesError,
  } = useGetInUseSeatUsages();

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
  if (seatsLoading || seatUsagesLoading) {
    return <div>Loading...</div>;
  }

  // TODO エラー表示を作成する
  if (seatsError || seatUsagesError) {
    return <div>Error: {seatsError?.message || seatUsagesError?.message}</div>;
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
      <SeatAreaMap seatUsages={seatUsages} seats={seats} />
    </div>
  );
}
