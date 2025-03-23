import HistoryListViewItemEntity from "./HistoryListViewItemEntity";

export default class HistoryPageEntity {
  constructor() {
    this.HistoryListViewItemEntities = new Array<HistoryListViewItemEntity>();
    this.AddMockHistoryItem(1);
    this.AddMockHistoryItem(2);
    this.AddMockHistoryItem(3);
    this.AddMockHistoryItem(4);
    this.AddMockHistoryItem(5);
    this.AddMockHistoryItem(6);
    this.AddMockHistoryItem(7);
    this.AddMockHistoryItem(8);
    this.AddMockHistoryItem(9);
    this.AddMockHistoryItem(10);
    this.AddMockHistoryItem(11);
    this.AddMockHistoryItem(12);
  }

  private AddMockHistoryItem(id: number) {
    const item = new HistoryListViewItemEntity();
    item.Key = id.toString();
    item.UserEntity = {
      Id: id.toString(),
      MembershipNumber: "001001",
      UserName: "あべ　ひろし",
    };
    item.AreaEntity = {
      Id: id.toString(),
      AreaName: "メインホール",
    };
    item.SeatEntity = {
      Id: id.toString(),
      SeatName: "101",
    };
    item.CheckInTime = new Date();
    item.CheckOutTime = new Date();
    item.Status = "利用中";
    this.HistoryListViewItemEntities.push(item);
  }

  //public SelectedDate!: Date;
  public SelectedDateStr!: string;

  public ScoreOfUsages!: number;

  public ScoreOfUsers!: number;

  public HistoryListViewItemEntities!: HistoryListViewItemEntity[];
}
