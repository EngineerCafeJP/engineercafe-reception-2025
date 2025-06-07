import client from "@/app/utils/supabase/client";

export const getSeats = async () => {
  return client.from("seats").select("*");
};

export const getSeatsWithCategory = async () => {
  return client.from("seats").select("*, seat_category:seat_categories(*)");
};
