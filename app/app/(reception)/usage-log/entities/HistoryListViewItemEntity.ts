export default class HistoryListViewItemEntity {
  public Id!: string;

  public CheckInTime!: Date;
  public get CheckInTime_YYYY_HH_MM() {
    return this.CheckInTime == null
      ? ""
      : this.CheckInTime.toISOString()
          .split("T")[1]
          .split(".")[0]
          .substring(0, 5); // TODO: (KUROKI) use date-fns
  }

  public CheckOutTime!: Date;
  public get CheckOutTime_YYYY_HH_MM() {
    return this.CheckOutTime == null
      ? ""
      : this.CheckOutTime.toISOString()
          .split("T")[1]
          .split(".")[0]
          .substring(0, 5); // TODO: (KUROKI)  use date-fns
  }

  public Status!: string;

  public AreaEntity!: { Id: string; AreaName: string };
  public get AreaName(): string {
    return this.AreaEntity == null ? "" : this.AreaEntity.AreaName;
  }

  public SeatEntity!: { Id: string; SeatName: string };
  public get SeatName(): string {
    return this.SeatEntity == null ? "" : this.SeatEntity.SeatName;
  }

  public UserEntity!: {
    Id: string;
    MembershipNumber: string;
    UserName: string;
  };
  public get MembershipNumber(): string {
    return this.UserEntity == null ? "" : this.UserEntity.MembershipNumber;
  }
  public get UserName(): string {
    return this.UserEntity == null ? "" : this.UserEntity.UserName;
  }
}
