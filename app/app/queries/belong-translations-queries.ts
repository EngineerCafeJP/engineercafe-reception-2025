import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";

export function fetchBelongTranslationsByLocale(
  client: SupabaseClient<Database>,
  locale: string,
) {
  return client
    .from("belong_translations")
    .select()
    .order("belong_id", { ascending: true })
    .eq("locale", locale);
}
