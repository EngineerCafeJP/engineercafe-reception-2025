"use client";


// Todo: 共通コントロール化

const PageTitleForm: React.FC = () => {
  return (
    <div className="mb-4 text-2xl font-bold">
      <h2 className="text-center">
        <span>{process.env.NEXT_PUBLIC_PAGE_TITLE_USAGE_HISTORY}</span>
      </h2>
    </div>
  );
};

export default PageTitleForm;
