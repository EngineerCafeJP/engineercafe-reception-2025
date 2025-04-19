import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type LatestUser = CamelCasedPropertiesDeep<
  Pick<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at">
>;
