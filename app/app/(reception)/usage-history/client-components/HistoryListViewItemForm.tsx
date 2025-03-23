"use client";

interface Props {
  rowNo: number;
  checkInTimeStr: string;
  checkOutTimeStr: string;
  status: string;
  userName: string;
  membershipNumber: string;
  areaName: string;
  seatName: string;
}

const HistoryListViewItemForm: React.FC<Props> = ({
  rowNo,
  checkInTimeStr,
  checkOutTimeStr,
  status,
  userName,
  membershipNumber,
  areaName,
  seatName,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      <div className="w-1/12">
        <div className="h-full pl-[5] text-left">
          <div>{rowNo}</div>
        </div>
      </div>
      <div className="w-3/12 p-4">
        <div className="flex flex-col">
          <div className="h-[1.8em] pt-[0.4em]">{checkInTimeStr} -</div>
          <div className="h-[1.8em] pt-[0.4em]">{checkOutTimeStr}</div>
        </div>
      </div>
      <div className="w-5/12 p-4">
        <div className="flex flex-col">
          <div className="h-[1.8em] pt-[0.2em]">
            {areaName}　{seatName}
          </div>
          <div className="h-[1.8em] pt-[0.2em]">
            {membershipNumber}　{userName}
          </div>
        </div>
      </div>
      <div className="w-2/12 p-4">
        <div className="h-full text-center">
          <div>{status}</div>
        </div>
      </div>
      <div className="w-1/12 p-4">
        <div className="h-full text-center">
          <div>del</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryListViewItemForm;
