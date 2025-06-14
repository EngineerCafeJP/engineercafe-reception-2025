import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";

export function fetchStayCategoryTranslationsByLocale(
  client: SupabaseClient<Database>,
  locale: string,
) {
  return client
    .from("stay_category_translations")
    .select()
    .order("stay_category_id", { ascending: true })
    .eq("locale", locale);
}
