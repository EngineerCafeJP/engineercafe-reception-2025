import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";

export function fetchUsers(
  client: SupabaseClient<Database>,
  filters: {
    searchText: string;
    number?: boolean;
    email?: boolean;
    phone?: boolean;
  },
) {
  let query = client
    .from("users")
    .select("*")
    .order("number", { ascending: true });

  const conditions: string[] = [];
  const keyword = filters.searchText.trim();

  if (keyword.length === 0) {
    return query; // 空文字ならそのまま返す（全件取得）
  }

  if (filters.number && !isNaN(Number(keyword))) {
    conditions.push(`number.eq.${Number(keyword)}`);
  }

  if (filters.email) {
    conditions.push(`email.ilike.%${keyword}%`);
  }

  if (filters.phone) {
    conditions.push(`phone.ilike.%${keyword}%`);
  }

  if (conditions.length > 0) {
    query = query.or(conditions.join(","));
  }

  return query;
}
