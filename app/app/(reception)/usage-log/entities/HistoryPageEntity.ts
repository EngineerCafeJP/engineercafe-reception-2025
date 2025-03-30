import HistoryListViewItemEntity from "./HistoryListViewItemEntity";

export default class HistoryPageEntity {
  constructor() {
    this.HistoryListViewItemEntities = new Array<HistoryListViewItemEntity>();

    // mockdata
    for (let index = 0; index < 1010; index++) {
      this.AddMockHistoryItem(index);
    }
  }

  private AddMockHistoryItem(id: number) {
    const item = new HistoryListViewItemEntity();

    item.Id = id.toString();

    const tmpNumber = `00000${id}`;
    item.UserEntity = {
      Id: id.toString(),
      MembershipNumber: tmpNumber.substring(
        tmpNumber.length - 6,
        tmpNumber.length,
      ),
      UserName: "マイケル・つのだ☆ひろし・ロビンソン",
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
