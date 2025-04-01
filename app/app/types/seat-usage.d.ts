// Seat型を定義
export type SeatUsage = {
  id: number;
  seatId: number;
  userId: number;
  startTime: string;
  endTime?: string | null;
  remark: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  scheduledEndTime: string;
};
