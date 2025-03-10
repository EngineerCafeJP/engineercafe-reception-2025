"use client";

const SignInForm: React.FC = () => {
  return (
    <div className="border-1 border-neutral-content mx-auto max-h-[400px] max-w-[680px] py-[40px]">
      <div className="m-auto max-w-[420px]">
        <h2 className="text-center">管理者ログイン</h2>
        <div className="mb-[24px] w-full">
          <label className="block">メールアドレス</label>
          <input className="input w-full" placeholder="email" type="email" />
        </div>
        <div className="mb-[24px] w-full">
          <label className="block">パスワード</label>
          <input
            className="input w-full"
            placeholder="password"
            type="password"
          />
        </div>
        <div className="text-right">
          <button className="btn btn-primary mx-auto">ログイン</button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
