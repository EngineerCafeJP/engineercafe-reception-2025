import { SearchUserParams } from "@/app/types/search_users_params";
import client from "@/utils/supabase/client";

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

export const fetchLatestUserId = () => {
  return client
    .from("users")
    .select("id, created_at")
    .order("id", { ascending: false })
    .limit(1);
};
