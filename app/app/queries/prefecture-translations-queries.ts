import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/app/utils/supabase/database.types";

export function fetchPrefectureTranslationsByLocale(
  client: SupabaseClient<Database>,
  locale: string,
) {
  return client
    .from("prefecture_translations")
    .select()
    .order("prefecture_id", { ascending: true })
    .eq("locale", locale);
}
