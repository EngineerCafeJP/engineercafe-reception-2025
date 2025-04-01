import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Job = CamelCasedPropertiesDeep<
  Omit<Database["public"]["Tables"]["job_translations"]["Row"], "created_at">
>;
