"use client"

const SignInForm: React.FC = () => {
  return (
    <div className="max-w-[680px] max-h-[400px] mx-auto border-1 border-neutral-content py-[40px]">


      <div className="max-w-[420px] m-auto">
        <h2 className="text-center">管理者ログイン</h2>
        <div className="w-full mb-[24px]">
          <label className="block">メールアドレス</label>
          <input type="email" className="input w-full" placeholder="email" />
        </div>
        <div className="w-full mb-[24px]">
          <label className="block">パスワード</label>
          <input type="password" className="input w-full" placeholder="password" />
        </div>
        <div className="text-right">
          <button className="btn btn-primary mx-auto">ログイン</button>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
