"use client";

import HistoryListViewItemEntity from "../entities/HistoryListViewItemEntity";
import HistoryListViewItemForm from "./HistoryListViewItemForm";

interface Props {
  listViewItemEntities: Array<HistoryListViewItemEntity>;
}

const HistoryListViewForm: React.FC<Props> = ({ listViewItemEntities }) => {
  let index = 1;

  return (
    <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[510px] w-full overflow-y-auto border-2 p-[0.5em]">
      {listViewItemEntities.map((item) => (
        <HistoryListViewItemForm
          key={index}
          {...{
            rowNo: index++,
            checkInTimeStr: item.CheckInTime_YYYY_HH_MM,
            checkOutTimeStr: item.CheckOutTime_YYYY_HH_MM,
            status: item.Status,
            userName: item.UserName,
            membershipNumber: item.MembershipNumber,
            areaName: item.AreaName,
            seatName: item.SeatName,
          }}
        />
      ))}
    </div>
  );
};

export default HistoryListViewForm;
