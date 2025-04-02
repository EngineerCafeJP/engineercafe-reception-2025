import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Prefecture = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["prefecture_translations"]["Row"]
>;
