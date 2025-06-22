"use client";

import humps from "humps";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UserEditModal, {
  UserFormData,
} from "@/[locale]/(reception)/components/UserEditModal";
import { useUpdateUser } from "@/[locale]/(reception)/hooks/use-update-user";
import { useRegistrationOptions } from "@/hooks/use-registration-options";
import { fetchUsers } from "@/queries/user-search-queries";
import { User } from "@/types";
import supabase from "@/utils/supabase/client";
import SearchFilters, { Filters } from "./components/SearchFilters";
import SearchInput from "./components/SearchInput";
import UserList from "./components/UserList";

type UserFilters = {
  searchText: string;
  id?: boolean;
  name?: boolean;
  pronunciation?: boolean;
  email?: boolean;
  phone?: boolean;
};

export default function UserSearchPage() {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { register, getValues } = useForm<Filters>();
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);

  const { prefectures, belongs, jobs } = useRegistrationOptions("ja");

  const {
    update: updateUser,
    isLoading: isUpdateUserLoading,
    error: updateUserError,
  } = useUpdateUser();

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
      setFilteredUsers(humps.camelizeKeys(data) as User[]);
    };
    loadUsers();
  }, []);

  const applySearchFilters = async (filters: UserFilters) => {
    const { data, error } = await fetchUsers(supabase, filters);
    if (error) {
      console.error("検索に失敗しました:", error.message);
      return;
    }
    setFilteredUsers(humps.camelizeKeys(data) as User[]);
  };

  const handleSearch = () => {
    const { searchText, id, name, pronunciation, email, phone } = getValues();

    const filters: UserFilters = {
      searchText,
      id: id || false,
      name: name || false,
      pronunciation: pronunciation || false,
      email: email || false,
      phone: phone || false,
    };
    console.log("適用する filters:", filters);
    applySearchFilters(filters);
  };

  const handleUpdateUser = async (userData: UserFormData) => {
    const updatedUser = await updateUser(userData.id, {
      ...userData,
      prefectureId: Number(userData.prefectureId),
      belongId: Number(userData.belongId),
      jobId: Number(userData.jobId),
    } as Partial<User>);

    if (updatedUser != null) {
      // ユーザー情報を再取得する
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">ユーザ検索</h1>

        <SearchFilters register={register} />
        <SearchInput register={register} onSubmit={handleSearch} />
        <UserList users={filteredUsers} onEditClicked={setEditUser} />
      </div>

      {isUpdateUserLoading && <div>Loading...</div>}
      {updateUserError && <div>Error: {updateUserError.message}</div>}

      {editUser && prefectures && belongs && jobs && (
        <UserEditModal
          belongs={belongs}
          initialValues={editUser}
          isOpen={Boolean(editUser)}
          jobs={jobs}
          prefectures={prefectures}
          onClose={() => setEditUser(null)}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
}
