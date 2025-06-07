import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/app/utils/supabase/database.types";

export function fetchFoundTranslationsByLocale(
  client: SupabaseClient<Database>,
  locale: string,
) {
  return client
    .from("found_translations")
    .select()
    .order("found_id", { ascending: true })
    .eq("locale", locale);
}
