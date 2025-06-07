"use client";

import Image from "next/image";
import { getUsageStatus } from "@/[locale]/(reception)/utils/seat-status-utility";
import ClockIcon from "@/components/icons/ClockIcon";
import SeatIcon from "@/components/icons/SeatIcon";
import UserIcon from "@/components/icons/UserIcon";
import { SeatUsage } from "@/types";
import { formatTimeWithQuarter } from "@/utils/format-time";

interface Props {
  isItemDeletable: boolean;
  displayRowNo: number;
  item: SeatUsage;
  onDeleteHistory: (displayRowNo: number, deleteItem: SeatUsage) => void;
}

const HistoryListViewItemForm: React.FC<Props> = ({
  isItemDeletable,
  displayRowNo,
  item,
  onDeleteHistory,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      <div className="w-1/14 p-2">
        <div className="h-full w-full pl-[3] text-left text-[0.75em] text-gray-500">
          {displayRowNo}.
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="flex flex-col gap-1">
          <div className="flex h-[21] flex-row gap-2">
            <div className="w-[21]">
              <ClockIcon size={21} />
            </div>
            <div>{formatTimeWithQuarter(item.startTime as string)} -</div>
          </div>
          <div className="flex h-[21] flex-row gap-2">
            <div className="w-[21]"></div>
            <div>{formatTimeWithQuarter(item.endTime as string)}</div>
          </div>
        </div>
      </div>
      <div className="w-7/14 p-2">
        <div className="flex flex-col gap-1">
          <div className="flex h-[21] flex-row gap-2">
            <div>
              <SeatIcon size={21} />
            </div>
            <div>{item.seat.name}</div>
          </div>
          <div className="flex h-[21] flex-row gap-2">
            <UserIcon size={21} />
            <div className="min-w-[80px]">{item.user.id}</div>
            <div
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              title={item.user.name}
            >
              {item.user.name}
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-left">
          <div>{getUsageStatus(item)}</div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-center">
          {isItemDeletable && (
            <button
              className="rounded-full bg-blue-200 px-2 py-2 text-[0.75em] font-bold text-white hover:bg-red-200"
              onClick={() => onDeleteHistory(displayRowNo, item)}
            >
              <Image
                alt="Delete this history item"
                height={19}
                src="/images/trashCan.png"
                width={19}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryListViewItemForm;
