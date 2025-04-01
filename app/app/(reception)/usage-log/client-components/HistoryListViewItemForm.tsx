"use client";

import SeatIconLabel from "@/app/(reception)/usage-log/client-components/elements/SeatIconLabel";
import TimerRangeIconLabel from "@/app/(reception)/usage-log/client-components/elements/TimerRangeIconLabel";
import UserIconLabel from "@/app/(reception)/usage-log/client-components/elements/UserIconLabel";
import HistoryListViewItemEntity from "@/app/(reception)/usage-log/entities/HistoryListViewItemEntity";

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
      <div className="w-3/14 p-2">
        <div className="flex flex-col">
          {/* // TODO: (KUROKI) use ~/components/icons/ClockIcon.tsx after pull feature-7*/}
          <div className="pt-[0.2em]">
            <TimerRangeIconLabel
              iconOpacity={1}
              iconSize={21}
              textSize={"1.0em"}
              timeEndText={null}
              timeStartText={`${item.CheckInTime_YYYY_HH_MM}`}
            />
          </div>
          <div className="h-[1.8em] pt-[0.2em]">
            <TimerRangeIconLabel
              iconOpacity={0}
              iconSize={21}
              textSize={"1.0em"}
              timeEndText={`${item.CheckOutTime_YYYY_HH_MM}`}
              timeStartText={null}
            />
          </div>
        </div>
      </div>
      <div className="w-6/14 p-2">
        <div className="flex flex-col">
          <div className="pt-[0.2em]">
            {/* // TODO: (KUROKI) use ~/components/icons/SeatIcon.tsx after pull feature-7 */}
            {/*
            {item.AreaName}　{item.SeatName}
            */}
            <SeatIconLabel
              areaText={item.AreaName}
              iconSize={21}
              seatText={item.SeatName}
              textSize={"1.0em"}
            />
          </div>
          <div className="h-[1.8em] overflow-hidden pt-[0.2em] text-ellipsis whitespace-nowrap">
            {/* // TODO: (KUROKI) use ~/components/icons/UserIcon.tsx after pull feature-7 */}
            {/*
            {item.MembershipNumber}　{item.UserName}
            */}
            <UserIconLabel
              iconSize={21}
              membershipNumberText={item.MembershipNumber}
              textSize={"1.0em"}
              userNameText={item.UserName}
            />
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
