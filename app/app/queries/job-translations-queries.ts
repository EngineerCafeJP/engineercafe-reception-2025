import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/database.types";

export function fetchJobTranslationsByLocale(
  client: SupabaseClient<Database>,
  locale: string,
) {
  return client
    .from("job_translations")
    .select()
    .order("job_id", { ascending: true })
    .eq("locale", locale);
}
