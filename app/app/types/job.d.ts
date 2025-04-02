import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Job = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["job_translations"]["Row"]
>;
