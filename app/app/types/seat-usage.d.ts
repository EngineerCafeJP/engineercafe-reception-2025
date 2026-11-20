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

// 退席を確定できない場合は確認画面に表示する案内を返す。
export type FinishSeatUsage = (seatUsage: SeatUsage) => Promise<string | void>;
