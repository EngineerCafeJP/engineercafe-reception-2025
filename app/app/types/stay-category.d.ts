import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type StayCategory = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["stay_category_translations"]["Row"]
>;
