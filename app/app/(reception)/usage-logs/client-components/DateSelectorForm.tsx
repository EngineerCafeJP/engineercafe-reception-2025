"use client";

import React, { useState } from "react";

interface Props {
  systemDate: string;
  onHistoryDateChanged: (date: Date) => void;
}

const DateSelectorForm: React.FC<Props> = ({
  systemDate,
  onHistoryDateChanged,
}) => {
  // 編集用カレンダー（操作用）
  // カレンダーアイコン部分のみ見せており、テキスト部分は見えないように幅を限界まで知事めています。
  // 理由：直接テキスト値の編集を行われると以下の弊害があるため、それらを禁止するための制御です。
  // 　→onChangedでデータ検索が走るため、日付を「15」と打とうとした場合、「1」で検索が走り、「5」で再度走ってしまう！
  // 　→年・月・日 を Deleteキーで削除された場合、「Invalid date」でエラーが発生する。
  const [inputedDate, setInputedDate] = useState(systemDate);
  // 選択された年月日の標示用テキストボックス。
  // 上述の通り inputedDate はテキスト部分を非表示としているため、代わりにこの標示用テキストボックスに日付テキストを標示しています。
  // 標示に特化しており、編集は不可（＝Readonly）としています。
  const [displayDate, setDisplayDate] = useState(
    systemDate.replaceAll("-", "/"),
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (displayDate == event.target.value) return;

    setInputedDate(event.target.value);
    setDisplayDate(event.target.value.replaceAll("-", "/"));
    onHistoryDateChanged(new Date(event.target.value));
  };

  return (
    <div className="mt-[1.5em] flex items-center justify-center">
      <input
        className="w-[140] border-transparent bg-transparent text-center text-[1.5em]"
        value={displayDate}
        readOnly
      />
      <input
        className="w-[27] border-transparent bg-transparent text-[1.5em]"
        type="date"
        value={inputedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateSelectorForm;
