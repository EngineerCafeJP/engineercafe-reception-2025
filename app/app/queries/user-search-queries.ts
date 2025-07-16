import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";

export function fetchUsers(
  client: SupabaseClient<Database>,
  filters: {
    searchText: string;
    id?: boolean;
    name?: boolean;
    pronunciation?: boolean;
    email?: boolean;
    phone?: boolean;
  },
  limit: number = 100,
) {
  let query = client
    .from("users")
    .select("*")
    .order("id", { ascending: false })
    .is("is_delete", null)
    .limit(limit);

  const conditions: string[] = [];
  const keyword = filters.searchText.trim();

  if (filters.id && keyword !== "" && !isNaN(Number(keyword))) {
    conditions.push(`id.eq.${Number(keyword)}`);
  }

  if (filters.name) {
    conditions.push(`name.ilike.%${keyword}%`);
  }
  if (filters.pronunciation) {
    conditions.push(`pronunciation.ilike.%${keyword}%`);
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
