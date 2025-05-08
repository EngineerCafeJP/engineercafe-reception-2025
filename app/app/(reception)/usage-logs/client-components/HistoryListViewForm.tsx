"use client";

import HistoryListViewItemEntity from "../entities/HistoryListViewItemEntity";
import HistoryListViewItemForm from "./HistoryListViewItemForm";

interface Props {
  listViewItemEntities: Array<HistoryListViewItemEntity>;
  onDeleteHistory: (
    displayRowNo: number,
    deleteItem: HistoryListViewItemEntity,
  ) => void;
}

const HistoryListViewForm: React.FC<Props> = ({
  listViewItemEntities,
  onDeleteHistory,
}) => {
  return (
    <div className="border-neutral-content mx-auto mt-[1.5em] max-h-[510px] w-full overflow-y-auto border-2 p-[0.5em]">
      {listViewItemEntities.map((item, index) => (
        <HistoryListViewItemForm
          key={index + 1}
          displayRowNo={index + 1}
          item={item}
          onDeleteHistory={onDeleteHistory}
        />
      ))}
    </div>
  );
};

export default HistoryListViewForm;
