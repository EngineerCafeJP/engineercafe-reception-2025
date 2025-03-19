"use client";

export type SignInFormProps = {
  signIn: (email: string, password: string) => Promise<void>;
};

const SignInForm: React.FC<SignInFormProps> = ({ signIn }) => {
  const handleSignIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn(email, password);
  };

  return (
    <form className="border-neutral-content mx-auto max-h-[400px] max-w-[680px] border-1 py-[40px]">
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
          <button
            className="btn btn-primary mx-auto"
            formAction={handleSignIn}
            type="submit"
          >
            ログイン
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
