import React from 'react';
import { AreaBox } from './client-components/AreaBox';
import ReceptionForm from './client-components/ReceptionForm';

 // ダミーデータ
 const mainHallSeats = [
  { id: 101, name: "101" },
  { id: 102, name: "102" },
  { id: 103, name: "103" },
  { id: 104, name: "104" },
  { id: 105, name: "105" },
  { id: 106, name: "106" },
  { id: 107, name: "107" },
  { id: 108, name: "108" },
  { id: 109, name: "109" },
  { id: 110, name: "110" },
  { id: 111, name: "111" },
  { id: 112, name: "112" },
  { id: 113, name: "113" },
  { id: 114, name: "114" },
  { id: 115, name: "115" },
  { id: 116, name: "116" },
  { id: 117, name: "117" },
  { id: 118, name: "118" },
  { id: 119, name: "119" },
 ];

 const makersSpaceSeats = [
  { id: 31, name: "31" },
  { id: 32, name: "32" },
  { id: 33, name: "33" },
  { id: 34, name: "34" },
 ];

 const concentrationSeats = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
 ];

 const meetingSeats = [
  { id: 21, name: "21" },
  { id: 22, name: "22" },
  { id: 23, name: "23" },
  { id: 24, name: "24" },
  { id: 25, name: "25" },
  { id: 26, name: "26" },
 ];

 const underSpaceSeats = [
  { id: 11, name: "11" },
  { id: 12, name: "12" },
  { id: 13, name: "13" },
  { id: 14, name: "14" },
  { id: 15, name: "15" },
  { id: 16, name: "防音室" },
 ];

 const terrasseSeats = [
  { id: 41, name: "41" },
  { id: 42, name: "42" },
 ];


export default function HomePage() {
  return (
    <div className="max-w-[80rem] mx-auto">
      <div className="flex justify-end py-[1rem]">
        <ReceptionForm />
      </div>
      <div className="flex justify-between gap-[0.5rem] overflow-x-auto">
        <AreaBox areaName="メインホール" maxCol={10} seats={mainHallSeats} seatUsages={[]} />
        <AreaBox areaName="MAKERSスペース" maxCol={2} seats={makersSpaceSeats} seatUsages={[]} />
      </div>
      <div className="flex justify-between gap-[0.5rem] overflow-x-auto">
        <AreaBox areaName="集中スペース" maxCol={3} seats={concentrationSeats} seatUsages={[]} />
        <AreaBox areaName="ミーティングスペース" maxCol={3} seats={meetingSeats} seatUsages={[]} />
        <AreaBox areaName="Underペース" maxCol={3} seats={underSpaceSeats} seatUsages={[]} />
        <AreaBox areaName="テラス" maxCol={2} seats={terrasseSeats} seatUsages={[]} />
      </div>
    </div>
  );
};
