import client from "@/app/utils/supabase/client";

export const fetchUserIdByNfcId = (nfcId: string) => {
  return client
    .from("nfcs")
    .select("user_id")
    .eq("nfc_id", nfcId)
    .maybeSingle();
};
