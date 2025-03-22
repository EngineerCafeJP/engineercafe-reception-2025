"use client";

import { useState, useEffect } from "react";

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    id: true,
    email: false,
    phone: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users"); //ダミーデータ
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  // チェックボックスの変更
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // 検索処理
  const handleSearch = () => {
    const keyword = searchText.toLowerCase();

    const filtered = users.filter((user) => {
      const matchId = filters.id && user.id.toString().includes(keyword);
      const matchEmail =
        filters.email && user.email.toLowerCase().includes(keyword);
      const matchPhone = filters.phone && user.phone.includes(keyword);

      return matchId || matchEmail || matchPhone;
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">ユーザ検索</h1>

        {/* 検索条件 */}
        <div className="mb-4 flex items-center gap-4">
          <label className="flex items-center">
            <input
              checked={filters.id}
              className="mr-2"
              name="id"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            会員番号
          </label>

          <label className="flex items-center">
            <input
              checked={filters.email}
              className="mr-2"
              name="email"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            Email
          </label>

          <label className="flex items-center">
            <input
              checked={filters.phone}
              className="mr-2"
              name="phone"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            電話番号
          </label>
        </div>

        {/* フリーテキスト検索 */}
        <textarea
          className="mb-4 h-24 w-full rounded-md border p-3 focus:ring focus:ring-blue-300"
          placeholder="フリーテキストで検索"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* 検索ボタン */}
        <button
          className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          onClick={handleSearch}
        >
          検索
        </button>

        {/* 検索結果 */}
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-bold">検索結果</h2>

          {filteredUsers.length > 0 ? (
            <ul className="space-y-4">
              {filteredUsers.map((user) => (
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
      </div>
    </div>
  );
}
