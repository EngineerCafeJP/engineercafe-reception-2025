// Seat型を定義
export type SeatUsage = {
  id: number;
  seatId: number;
  userId: number;
  startTime: string;
  endTime?: string | null;
  remark: string;
  usageDurationMinutes: number;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  seat?: Seat;
  user?: User;
};
