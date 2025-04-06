"use client";
import { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    id: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

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

        <SearchFilters filters={filters} setFilters={setFilters} />
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />
        <UserList users={filteredUsers} />
      </div>
    </div>
  );
}
