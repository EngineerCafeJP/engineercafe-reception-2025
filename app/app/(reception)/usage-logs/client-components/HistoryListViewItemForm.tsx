"use client";

import Image from "next/image";
import HistoryListViewItemEntity from "@/app/(reception)/usage-logs/entities/HistoryListViewItemEntity";

interface Props {
  rowNo: number;
  item: HistoryListViewItemEntity;
  onDeleteHistory: (
    rowNo: number,
    deleteItem: HistoryListViewItemEntity,
  ) => void;
}

const HistoryListViewItemForm: React.FC<Props> = ({
  rowNo,
  item,
  onDeleteHistory,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      <div className="w-1/14 p-2">
        <div className="h-full w-full pl-[3] text-left text-[0.75em] text-gray-500">
          {rowNo}.
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="flex flex-col gap-1">
          {/* // TODO: (KUROKI) use ~/components/icons/ClockIcon.tsx after pull feature-7*/}
          <div className="flex h-[21] flex-row gap-2">
            <div className="w-[21]">
              <Image
                alt="Time"
                height={21}
                src={"/images/mock.png"}
                width={21}
              />
            </div>
            <div>{item.CheckInTime_YYYY_HH_MM} -</div>
          </div>
          <div className="flex h-[21] flex-row gap-2">
            <div className="w-[21]"></div>
            <div>{item.CheckOutTime_YYYY_HH_MM}</div>
          </div>
        </div>
      </div>
      <div className="w-7/14 p-2">
        <div className="flex flex-col gap-1">
          <div className="flex h-[21] flex-row gap-2">
            {/* // TODO: (KUROKI) use ~/components/icons/SeatIcon.tsx after pull feature-7 */}
            <div>
              <Image
                alt="Seat"
                height={21}
                src={"/images/mock.png"}
                width={21}
              />
            </div>
            <div>{item.AreaName}</div>
            <div>{item.SeatName}</div>
          </div>
          <div className="flex h-[21] flex-row gap-2">
            {/* // TODO: (KUROKI) use ~/components/icons/UserIcon.tsx after pull feature-7 */}
            <Image alt="User" height={21} src={"/images/mock.png"} width={21} />
            <div>{item.MembershipNumber}</div>
            <div
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              title={item.UserName}
            >
              {item.UserName}
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-center">
          <div>{item.Status}</div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-center">
          {/* // TODO: (KUROKI) add ~/components/icons/trashCanIcon.tsx */}
          <button
            className="rounded-full bg-blue-200 px-2 py-2 text-[0.75em] font-bold text-white hover:bg-red-200"
            onClick={() => onDeleteHistory(rowNo, item)}
          >
            <img className="h-[19px] w-[19px]" src="/images/trashCan.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryListViewItemForm;
