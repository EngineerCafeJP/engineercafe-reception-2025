"use client";

import { getUsageStatus } from "@/[locale]/(reception)/utils/seat-status-utility";
import { SeatUsage } from "@/types";

interface Props {
  isOpen: boolean;
  displayRowNo: number;
  seatUsage: SeatUsage;
  onApplied: () => void;
  onCanceled: () => void;
}

const DeleteHistoryItemConfirmModal: React.FC<Props> = ({
  isOpen,
  displayRowNo,
  seatUsage,
  onApplied,
  onCanceled,
}) => {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="shared-modal">
      <div className="modal-box border-accent border-2 p-[0]">
        <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
          履歴削除
        </div>
        <div className="pt-[2em] text-center">
          <div>利用履歴を削除しますか？</div>
          <div>行番号：{displayRowNo}</div>
          <div className="m-4 border-1 border-gray-300 p-2">
            <div>{seatUsage.seat.name}</div>
            <div className="flex justify-center gap-5">
              <span>{seatUsage.user.id}</span>
              <span title={seatUsage.user.name}>{seatUsage.user.name}</span>
            </div>
            <div>{getUsageStatus(seatUsage)}</div>
          </div>
        </div>
        <div className="flex flex-col gap-[1rem] p-[2rem]">
          <div className="flex justify-around">
            <button
              className="btn btn-secondary w-[100px]"
              onClick={onCanceled}
            >
              いいえ
            </button>
            <button className="btn btn-primary w-[100px]" onClick={onApplied}>
              はい
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteHistoryItemConfirmModal;
