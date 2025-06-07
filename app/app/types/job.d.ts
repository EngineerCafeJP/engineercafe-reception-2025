import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/app/utils/supabase/database.types";

export type Job = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["job_translations"]["Row"]
>;
