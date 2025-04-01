import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Belong = CamelCasedPropertiesDeep<
  Omit<Database["public"]["Tables"]["belong_translations"]["Row"], "created_at">
>;
