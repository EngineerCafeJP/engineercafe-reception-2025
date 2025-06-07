import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/app/utils/supabase/database.types";

export type Nfc = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["nfcs"]["Row"]
>;
