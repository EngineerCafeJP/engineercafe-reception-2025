"use client";

import { useState } from "react";

// Todo: 共通コントロール化

const PageTitleForm: React.FC = () => {
  const [isVisible, setVisibility] = useState(false);

  const changeVisibility = () => {
    setVisibility(!isVisible);
  };

  return (
    <div className="mb-4 text-2xl font-bold">
      <h2 className="text-center">
        <span>利用履歴</span>
        {isVisible ? <span>（Todo: 共通コントロール化）</span> : null}
        <button onClick={changeVisibility}>👀</button>
      </h2>
    </div>
  );
};

export default PageTitleForm;
