import client from "@/utils/supabase/client";

export const getSeats = async () => {
  return client.from("seats").select("*").order("id", { ascending: true });
};

export const getSeatsWithCategory = async () => {
  return client
    .from("seats")
    .select("*, seat_category:seat_categories(*)")
    .order("order", { ascending: true });
};

export const fetchSeatWithCategory = async (seatId: number) => {
  return client
    .from("seats")
    .select("*, seat_category:seat_categories(*)")
    .eq("id", seatId)
    .maybeSingle();
};

export const updateSeat = async (
  seatId: number,
  seatParams: { outOfService: boolean; attentionMessage: string },
) => {
  return client
    .from("seats")
    .update({
      out_of_service: seatParams.outOfService,
      attention_message: seatParams.attentionMessage,
    })
    .eq("id", seatId);
};
