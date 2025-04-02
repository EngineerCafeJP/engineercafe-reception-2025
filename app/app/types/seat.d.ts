// Seat型を定義
export type Seat = {
  id: number;
  name: string;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  seatCategory?: SeatCategory;
};

export type SeatWithCategory = Seat & {
  seatCategory: SeatCategory;
};
