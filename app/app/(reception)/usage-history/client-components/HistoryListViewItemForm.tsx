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
      <div className="w-1/14 p-2">
        <div className="h-full w-full pl-[3] text-left text-[0.75em] text-gray-500">
          {rowNo}.
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="flex flex-col">
          {/* // TODO: (KUROKI) use ~/components/icons/ClockIcon.tsx after pull feature-7*/}
          <div className="h-[1.8em] pt-[0.4em]">{checkInTimeStr} -</div>
          <div className="h-[1.8em] pt-[0.4em]">{checkOutTimeStr}</div>
        </div>
      </div>
      <div className="w-7/14 p-2">
        <div className="flex flex-col">
          <div className="h-[1.8em] pt-[0.2em]">
            {/* // TODO: (KUROKI) use ~/components/icons/SeatIcon.tsx after pull feature-7 */}
            {areaName}　{seatName}
          </div>
          <div className="h-[1.8em] overflow-hidden pt-[0.2em] text-ellipsis whitespace-nowrap">
            {/* // TODO: (KUROKI) use ~/components/icons/UserIcon.tsx after pull feature-7 */}
            {membershipNumber}　{userName}
          </div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-center">
          <div>{status}</div>
        </div>
      </div>
      <div className="w-2/14 p-2">
        <div className="h-full text-center">
          {/* // TODO: (KUROKI) add ~/components/icons/trashCanIcon.tsx */}
          <button className="rounded-full bg-blue-200 px-2 py-2 text-[0.75em] font-bold text-white hover:bg-red-200">
            <img className="h-[19px] w-[19px]" src="/images/trashCan.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryListViewItemForm;
