import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/app/utils/supabase/database.types";

export type Found = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["found_translations"]["Row"]
>;
