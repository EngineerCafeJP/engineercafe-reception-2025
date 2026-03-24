import { render, screen } from "@testing-library/react";
import { Prefecture, Seat, User } from "@/types";
import ReceptionForm from "./ReceptionForm";

jest.mock("react-use", () => ({
  useKey: jest.fn(),
}));

jest.mock("use-debounce", () => ({
  useDebounce: (value: string) => [value],
}));

jest.mock("@/[locale]/(reception)/components/CardReaderControlButton", () => ({
  __esModule: true,
  default: () => <div>CardReaderControlButton</div>,
}));

jest.mock(
  "@/[locale]/(reception)/home/client-components/AssignSeatConfirmModal",
  () => ({
    __esModule: true,
    default: () => <div>AssignSeatConfirmModal</div>,
  }),
);

jest.mock(
  "@/[locale]/(reception)/home/client-components/UsageIntervalLabel",
  () => ({
    __esModule: true,
    default: () => <div>UsageIntervalLabel</div>,
  }),
);

jest.mock("@/components/icons/UserIcon", () => ({
  __esModule: true,
  default: () => <div>UserIcon</div>,
}));

describe("ReceptionForm", () => {
  const prefectures = [
    { prefectureId: 13, name: "東京都", locale: "ja", createdAt: null },
    { prefectureId: 40, name: "福岡県", locale: "ja", createdAt: null },
  ] as Prefecture[];

  const buildUser = (overrides: Partial<User> = {}): User =>
    ({
      id: 1001,
      name: "山田太郎",
      pronunciation: "やまだたろう",
      email: "yamada@example.com",
      phone: "09000000000",
      nonJapanese: false,
      prefectureId: 40,
      prefectureOther: "",
      city: "福岡市中央区",
      address: "1-1-1",
      building: "",
      belongId: 1,
      belongOther: "",
      belongDetail: "",
      jobId: 1,
      jobOther: "",
      foundId: 1,
      foundOther: "",
      comments: "",
      warnings: "",
      createdAt: "",
      updatedAt: "",
      ...overrides,
    }) as User;

  const defaultProps = {
    searchWord: "1001",
    searchUserList: [] as User[] | null,
    searchNfcError: null,
    emptySeats: [] as Seat[],
    selectedUser: null as User | null,
    searchType: "user_id" as const,
    prefectures,
    onSelectUser: jest.fn(),
    onChangeSearchWord: jest.fn(),
    onClose: jest.fn(),
    onConnectUsbDevice: jest.fn(),
    onDetectCard: jest.fn(),
    onDisconnectUsbDevice: jest.fn(),
    assignSeat: jest.fn(),
    onEditUser: jest.fn(),
    onChangeSearchType: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("検索候補一覧で福岡市内ユーザーに市内ラベルを表示すること", () => {
    render(
      <ReceptionForm
        {...defaultProps}
        searchUserList={[
          buildUser({
            city: "福岡市博多区",
            latestSeatUsage: {
              id: 1,
              seatId: 1,
              userId: 1001,
              startTime: "2026-03-24T10:00:00.000Z",
              usageDurationMinutes: 120,
              endTime: null,
              createdAt: "",
              updatedAt: "",
            },
          }),
        ]}
      />,
    );

    expect(screen.getByText("山田太郎")).toBeInTheDocument();
    expect(screen.getByText(/前回:2026\/03\/24/)).toBeInTheDocument();
    expect(screen.getByText("市内")).toBeInTheDocument();
  });

  it("検索候補一覧で福岡市外ユーザーに都道府県名を表示すること", () => {
    render(
      <ReceptionForm
        {...defaultProps}
        searchUserList={[
          buildUser({
            city: "渋谷区",
            prefectureId: 13,
          }),
        ]}
      />,
    );

    expect(screen.getByText("東京都")).toBeInTheDocument();
  });

  it("選択済み会員カードでも同じ所在地ラベルを表示すること", () => {
    render(
      <ReceptionForm
        {...defaultProps}
        searchUserList={null}
        selectedUser={buildUser({
          city: "大阪市北区",
          prefectureId: 99,
          prefectureOther: "大阪府",
        })}
      />,
    );

    expect(screen.getByText("所在地: 大阪府")).toBeInTheDocument();
  });
});
