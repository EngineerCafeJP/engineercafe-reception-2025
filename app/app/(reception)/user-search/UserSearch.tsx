"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchUsers } from "@/app/queries/user-search-queries";
import supabase from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";
import SearchFilters, { Filters } from "./SearchFilters";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

type User = Tables<"users">;

type UserFilters = {
  searchText: string;
  id?: boolean;
  email?: boolean;
  phone?: boolean;
};

export default function UserSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { register, getValues } = useForm<Filters>();

  useEffect(() => {
    const loadUsers = async () => {
      const { data, error } = await fetchUsers(supabase, {
        searchText: "", // 初期値
        id: false,
        email: false,
        phone: false,
      });
      if (error) {
        console.error("ユーザ取得に失敗しました:", error.message);
        return;
      }
      setUsers(data);
      setFilteredUsers(data);
    };
    loadUsers();
  }, []);

  const applySearchFilters = async (filters: UserFilters) => {
    const { data, error } = await fetchUsers(supabase, filters);
    if (error) {
      console.error("検索に失敗しました:", error.message);
      return;
    }
    setFilteredUsers(data);
  };

  const handleSearch = () => {
    const { searchText, id, email, phone } = getValues();

    const filters: UserFilters = {
      searchText,
      id: id || false,
      email: email || false,
      phone: phone || false,
    };
    console.log("適用する filters:", filters);
    applySearchFilters(filters);
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
