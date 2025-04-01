import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Found = CamelCasedPropertiesDeep<
  Omit<Database["public"]["Tables"]["found_translations"]["Row"], "created_at">
>;
