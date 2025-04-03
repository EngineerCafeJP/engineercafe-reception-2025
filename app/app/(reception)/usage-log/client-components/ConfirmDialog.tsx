"use client";

import { JSX } from "react/jsx-runtime";

interface Props {
  isOpen: boolean;
  title: string;
  messageContext: JSX.Element;
  onApplied: () => void;
  onCanceled: () => void;
}

const ConfirmDialog: React.FC<Props> = ({
  isOpen,
  title,
  messageContext,
  onApplied,
  onCanceled,
}) => {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="shared-modal">
      <div className="modal-box border-accent border-2 p-[0]">
        <div className="bg-accent text-primary-content flex h-[50px] items-center justify-center text-[1.25rem] font-[800]">
          {title}
        </div>
        <div className="pt-[2em] text-center">{messageContext}</div>
        <div className="flex flex-col gap-[1rem] p-[1rem] p-[2rem]">
          <div className="flex justify-around">
            <button
              className="btn btn-secondary w-[100px]"
              onClick={onCanceled}
            >
              いいえ
            </button>
            <button className="btn btn-primary w-[100px]" onClick={onApplied}>
              はい
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
