"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchFilters from "./SearchFilters";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { register, watch, getValues } = useForm<Filters>({
    defaultValues: {
      searchText: "",
      id: false,
      email: false,
      phone: false,
    },
  });
  const filters = watch();

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
    const { searchText, id, email, phone } = getValues();
    const keyword = searchText.toLowerCase();

    const filtered = users.filter((user) => {
      const matchId = id && user.id.toString().includes(keyword);
      const matchEmail = email && user.email.toLowerCase().includes(keyword);
      const matchPhone = phone && user.phone.includes(keyword);
      return matchId || matchEmail || matchPhone;
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">ユーザ検索</h1>

        <SearchFilters register={register} />
        <SearchInput register={register} onSubmit={handleSearch} />
        <UserList users={filteredUsers} />
      </div>
    </div>
  );
}
