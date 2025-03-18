"use client";

import React, { useState } from "react";
import { User } from "@/app/types";
import ReceptionForm from "./client-components/ReceptionForm";
import { SeatAreaMap } from "./client-components/SeatAreaMap";

// ダミーデータ
const seats = [
  { id: 101, name: "101", areaName: "メインホール" },
  { id: 102, name: "102", areaName: "メインホール" },
  { id: 103, name: "103", areaName: "メインホール" },
  { id: 104, name: "104", areaName: "メインホール" },
  { id: 105, name: "105", areaName: "メインホール" },
  { id: 106, name: "106", areaName: "メインホール" },
  { id: 107, name: "107", areaName: "メインホール" },
  { id: 108, name: "108", areaName: "メインホール" },
  { id: 109, name: "109", areaName: "メインホール" },
  { id: 110, name: "110", areaName: "メインホール" },
  { id: 111, name: "111", areaName: "メインホール" },
  { id: 112, name: "112", areaName: "メインホール" },
  { id: 113, name: "113", areaName: "メインホール" },
  { id: 114, name: "114", areaName: "メインホール" },
  { id: 115, name: "115", areaName: "メインホール" },
  { id: 116, name: "116", areaName: "メインホール" },
  { id: 117, name: "117", areaName: "メインホール" },
  { id: 118, name: "118", areaName: "メインホール" },
  { id: 119, name: "119", areaName: "メインホール" },
  { id: 31, name: "31", areaName: "MAKERSスペース" },
  { id: 32, name: "32", areaName: "MAKERSスペース" },
  { id: 33, name: "33", areaName: "MAKERSスペース" },
  { id: 34, name: "34", areaName: "MAKERSスペース" },
  { id: 1, name: "1", areaName: "集中スペース" },
  { id: 2, name: "2", areaName: "集中スペース" },
  { id: 3, name: "3", areaName: "集中スペース" },
  { id: 4, name: "4", areaName: "集中スペース" },
  { id: 5, name: "5", areaName: "集中スペース" },
  { id: 6, name: "6", areaName: "集中スペース" },
  { id: 21, name: "21", areaName: "ミーティングスペース" },
  { id: 22, name: "22", areaName: "ミーティングスペース" },
  { id: 23, name: "23", areaName: "ミーティングスペース" },
  { id: 24, name: "24", areaName: "ミーティングスペース" },
  { id: 25, name: "25", areaName: "ミーティングスペース" },
  { id: 26, name: "26", areaName: "ミーティングスペース" },
  { id: 11, name: "11", areaName: "UNDERスペース" },
  { id: 12, name: "12", areaName: "UNDERスペース" },
  { id: 13, name: "13", areaName: "UNDERスペース" },
  { id: 14, name: "14", areaName: "UNDERスペース" },
  { id: 15, name: "15", areaName: "UNDERスペース" },
  { id: 16, name: "防音室", areaName: "UNDERスペース" },
  { id: 41, name: "41", areaName: "テラス" },
  { id: 42, name: "42", areaName: "テラス" },
];

const seatUsages = [
  {
    id: 1,
    seatId: 101,
    userCode: "001234",
    startTime: "2025-03-14 10:00:00",
    endTime: "2025-03-14 11:00:00",
  },
  {
    id: 2,
    seatId: 102,
    userCode: "001235",
    startTime: "2025-03-14 10:00:00",
    endTime: "2025-03-14 11:00:00",
  },
  {
    id: 3,
    seatId: 103,
    userCode: "001236",
    startTime: "2025-03-14 10:00:00",
    endTime: "2025-03-14 11:00:00",
  },
  {
    id: 4,
    seatId: 104,
    userCode: "001237",
    startTime: "2025-03-14 10:00:00",
    endTime: "2025-03-14 11:00:00",
  },
];

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

  return (
    <div className="mx-auto max-w-[80rem]">
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
