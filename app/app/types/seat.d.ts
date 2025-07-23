// Seat型を定義
export type Seat = {
  id: number;
  name: string;
  outOfService: boolean;
  attentionMessage: string;
  order: number;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  seatCategory?: SeatCategory;
};

export type SeatWithCategory = Seat & {
  seatCategory: SeatCategory;
};
