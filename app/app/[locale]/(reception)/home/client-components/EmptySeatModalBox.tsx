"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSettings } from "react-icons/md";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Seat } from "@/types";

interface EmptySeatModalBoxProps {
  seat: Seat;
  onUpdateSeat: (
    seatId: number,
    seatParams: {
      outOfService: boolean;
      attentionMessage: string;
    },
  ) => void;
  onClose: () => void;
}

export const EmptySeatModalBox: React.FC<EmptySeatModalBoxProps> = ({
  seat,
  onUpdateSeat,
  onClose,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  const { register, handleSubmit } = useForm<{
    outOfService: boolean;
    attentionMessage: string;
  }>({
    defaultValues: {
      outOfService: seat.outOfService,
      attentionMessage: seat.attentionMessage,
    },
  });

  const submit = (data: {
    outOfService: boolean;
    attentionMessage: string;
  }) => {
    onUpdateSeat(seat.id, data);
    onClose();
  };

  return (
    <div className="modal-box border-primary border-2 p-[0]">
      <div className="bg-primary text-primary-content flex h-[50px] items-center justify-center gap-4 text-[1.25rem] font-[800]">
        {seat.outOfService ? <p>空席(使用不可)</p> : <p>空席</p>}

        <MdSettings
          className="absolute right-4 cursor-pointer"
          size={20}
          onClick={() => setShowEdit(!showEdit)}
        />
      </div>

      {showEdit ? (
        <div className="flex w-full flex-col gap-[1rem] p-[2rem]">
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex w-full flex-col gap-[1rem]">
              <div className="flex flex-col gap-[0.5rem]">
                <label className="text-sm">使用可否</label>
                <select
                  className="select select-bordered"
                  {...register("outOfService")}
                >
                  <option value="false">使用可能</option>
                  <option value="true">使用不可</option>
                </select>
              </div>

              <div className="p-2">
                <label>注意事項</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("attentionMessage")}
                />
              </div>
            </div>
            <div className="mx-auto flex justify-around gap-[1rem]">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEdit(!showEdit)}
              >
                戻る
              </button>
              <button className="btn btn-primary" type="submit">
                変更する
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-[1rem] p-[2rem]">
          <p className="text-error text-center text-sm whitespace-pre-wrap">
            {seat.attentionMessage}
          </p>
          <div className="flex flex-col gap-[1rem]">
            <ul className="list bg-base-100 rounded-box px-[0] shadow-md">
              <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
                <div>
                  <SeatIcon size={40} />
                </div>
                <div className="flex items-center align-[middle] text-[1.25rem]">
                  <div>{seat.name}</div>
                </div>
              </li>
              <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
                <div>
                  <UserIcon size={40} />
                </div>
                <div className="flex items-center align-[middle] text-[1.25rem]">
                  <div></div>
                </div>
              </li>
              <li className="list-row border-base-300 rounded-none border-b py-[0.5rem]">
                <div>
                  <ClockIcon size={40} />
                </div>
                <div className="flex items-center align-[middle] text-[1.25rem]">
                  <div></div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mx-auto">
            <button className="btn btn-secondary" onClick={onClose}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
