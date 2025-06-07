import { User } from "@/app/types";
import { SearchUserParams } from "@/app/types/search-users-params";
import client from "@/app/utils/supabase/client";

export const fetchUsersBySearchParams = (params?: SearchUserParams) => {
  if (
    params == null ||
    (!params.id && !params.name && !params.email && !params.phone)
  ) {
    return { data: [], error: null };
  }

  const query = client
    .from("users")
    .select("*")
    .is("is_delete", null)
    .limit(10);

  // idはint型でlike検索できないので、完全一致
  if (params.id) {
    return query.eq("id", params.id);
  } else {
    const conditions = [];
    if (params.name) {
      conditions.push(`name.like.%${params.name}%`);
    }
    if (params.email) {
      conditions.push(`email.like.%${params.email}%`);
    }
    if (params.phone) {
      conditions.push(`phone.like.%${params.phone}%`);
    }
    return query.or(conditions.join(","));
  }
};

export const fetchLatestRegisteredUserId = () => {
  return client
    .from("users")
    .select("id, created_at")
    .order("id", { ascending: false })
    .limit(1)
    .single();
};

export const fetchUser = (userId: number) => {
  return client.from("users").select("*").eq("id", userId).single();
};

export const updateUser = (userId: number, user: Partial<User>) => {
  const updateData = {
    name: user.name,
    pronunciation: user.pronunciation,
    email: user.email,
    phone: user.phone,
    prefecture_id: user.prefectureId,
    prefecture_other: user.prefectureOther,
    city: user.city,
    address: user.address,
    building: user.building,
    belong_id: user.belongId,
    belong_other: user.belongOther,
    belong_detail: user.belongDetail,
    job_id: user.jobId,
    job_other: user.jobOther,
    comments: user.comments,
    warnings: user.warnings,
    updated_at: new Date().toISOString(),
  };

  // undefinedの値を除外
  const filteredUpdateData = Object.fromEntries(
    Object.entries(updateData).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  );

  return client.from("users").update(filteredUpdateData).eq("id", userId);
};
