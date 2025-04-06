type Props = {
  users: { id: number; email: string; phone: string }[];
};

export default function UserList({ users }: Props) {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold">検索結果</h2>
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="rounded-lg bg-gray-100 p-4 shadow">
              <p className="text-lg font-semibold">会員番号: {user.id}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-500">電話番号: {user.phone}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">該当ユーザが見つかりませんでした。</p>
      )}
    </div>
  );
}
