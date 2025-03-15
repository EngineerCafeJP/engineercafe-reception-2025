"use client"

export type SignInFormProps = {
  signIn: (email: string, password: string) => Promise<void>
}

const SignInForm: React.FC<SignInFormProps> = ({ signIn }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[680px] max-h-[400px] mx-auto border-1 border-neutral-content py-[40px]">
      <div className="max-w-[420px] m-auto">
        <h2 className="text-center">管理者ログイン</h2>
        <div className="w-full mb-[24px]">
          <label className="block">メールアドレス</label>
          <input type="email" name="email" className="input w-full" placeholder="email" data-testid="email-input" />
        </div>
        <div className="w-full mb-[24px]">
          <label className="block">パスワード</label>
          <input type="password" name="password" className="input w-full" placeholder="password" data-testid="password-input" />
        </div>
        <div className="text-right">
          <button className="btn btn-primary mx-auto" type="submit" data-testid="login-button">ログイン</button>
        </div>
      </div>
    </form>
  );
}

export default SignInForm;
