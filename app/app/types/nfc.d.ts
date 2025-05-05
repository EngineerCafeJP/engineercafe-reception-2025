import { CamelCasedPropertiesDeep } from "type-fest";
import { Database } from "@/utils/supabase/database.types";

export type Nfc = CamelCasedPropertiesDeep<
  Database["public"]["Tables"]["nfcs"]["Row"]
>;
