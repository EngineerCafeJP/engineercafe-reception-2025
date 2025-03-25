"use client";

import HistoryListViewItemEntity from "../entities/HistoryListViewItemEntity";
import HistoryListViewItemForm from "./HistoryListViewItemForm";

interface Props {
  listViewItemEntities: Array<HistoryListViewItemEntity>;
  onDeleteHistory: (
    rowNo: number,
    deleteItem: HistoryListViewItemEntity,
  ) => void;
}

const HistoryListViewForm: React.FC<Props> = ({
  listViewItemEntities,
  onDeleteHistory,
}) => {
  let index = 1;

  return (
    <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[510px] w-full overflow-y-auto border-2 p-[0.5em]">
      {listViewItemEntities.map((item) => (
        <HistoryListViewItemForm
          key={index}
          {...{
            rowNo: index++,
            item: item,
            onDeleteHistory: onDeleteHistory,
          }}
        />
      ))}
    </div>
  );
};

export default HistoryListViewForm;
