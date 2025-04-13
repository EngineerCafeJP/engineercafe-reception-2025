"use client";

import ClockIcon from "@/app/components/icons/ClockIcon";
import SeatIcon from "@/app/components/icons/SeatIcon";
import UserIcon from "@/app/components/icons/UserIcon";
import { SeatUsage } from "@/app/types";
import { formatTimeWithQuarter } from "@/utils/formatTime";
import { getUsageStatus } from "@/utils/seatStatusUtility";
import { getFormatedUserId } from "@/utils/userUtility";

interface Props {
  displayRowNo: number;
  item: SeatUsage;
  onDeleteHistory: (displayRowNo: number, deleteItem: SeatUsage) => void;
}

const HistoryListViewItemForm: React.FC<Props> = ({
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
          {/* // TODO: (KUROKI) use ~/components/icons/ClockIcon.tsx after pull feature-7*/}
          <div className="flex h-[21] flex-row gap-2">
            <div className="w-[21]">
              {/*
              <Image
                alt="Time"
                height={21}
                src={"/images/mock.png"}
                width={21}
              />
              */}
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
            {/* // TODO: (KUROKI) use ~/components/icons/SeatIcon.tsx after pull feature-7 */}
            <div>
              {/*
              <Image
                alt="Seat"
                height={21}
                src={"/images/mock.png"}
                width={21}
              />
              */}
              <SeatIcon size={21} />
            </div>
            {/*
            <div>{item.seats.seatCategories.name}</div>
            */}
            <div>{item.seats.name}</div>
          </div>
          <div className="flex h-[21] flex-row gap-2">
            {/* // TODO: (KUROKI) use ~/components/icons/UserIcon.tsx after pull feature-7 */}
            {/*
            <Image alt="User" height={21} src={"/images/mock.png"} width={21} />
            */}
            <UserIcon size={21} />
            <div>{getFormatedUserId(item.users.id)}</div>
            <div
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              title={item.users.name}
            >
              {item.users.name}
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-left">
          <div>
            {getUsageStatus(item.startTime as string, item.endTime as string)}
          </div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-center">
          {/* // TODO: (KUROKI) add ~/components/icons/trashCanIcon.tsx */}
          <button
            className="rounded-full bg-blue-200 px-2 py-2 text-[0.75em] font-bold text-white hover:bg-red-200"
            onClick={() => onDeleteHistory(displayRowNo, item)}
          >
            <img className="h-[19px] w-[19px]" src="/images/trashCan.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryListViewItemForm;
