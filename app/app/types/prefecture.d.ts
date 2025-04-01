import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Prefecture = CamelCasedPropertiesDeep<
  Omit<
    Database["public"]["Tables"]["prefecture_translations"]["Row"],
    "created_at"
  >
>;
