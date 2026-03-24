import { Prefecture, User } from "@/types";
import { getUserLocationLabel } from "./user-location-label";

describe("getUserLocationLabel", () => {
  const prefectures = [
    { prefectureId: 13, name: "東京都", locale: "ja", createdAt: null },
    { prefectureId: 40, name: "福岡県", locale: "ja", createdAt: null },
  ] as Prefecture[];

  const buildUser = (overrides: Partial<User> = {}): User =>
    ({
      id: 1,
      name: "テストユーザー",
      pronunciation: "てすとゆーざー",
      email: "test@example.com",
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

  it("city に福岡市が含まれる場合は市内を返すこと", () => {
    expect(getUserLocationLabel(buildUser(), prefectures)).toBe("市内");
  });

  it("福岡市外の場合は prefectureId から都道府県名を返すこと", () => {
    expect(
      getUserLocationLabel(
        buildUser({
          prefectureId: 13,
          city: "渋谷区",
        }),
        prefectures,
      ),
    ).toBe("東京都");
  });

  it("prefectureId で解決できない場合は prefectureOther を返すこと", () => {
    expect(
      getUserLocationLabel(
        buildUser({
          prefectureId: 99,
          prefectureOther: "海外",
          city: "Singapore",
        }),
        prefectures,
      ),
    ).toBe("海外");
  });

  it("prefectureOther に前後空白がある場合は trim して返すこと", () => {
    expect(
      getUserLocationLabel(
        buildUser({
          prefectureId: 99,
          prefectureOther: "  熊本県  ",
          city: "熊本市",
        }),
        prefectures,
      ),
    ).toBe("熊本県");
  });

  it("都道府県を解決できない場合はフォールバックを返すこと", () => {
    expect(
      getUserLocationLabel(
        buildUser({
          prefectureId: 999,
          prefectureOther: "",
          city: "",
        }),
        prefectures,
      ),
    ).toBe("都道府県不明");
  });
});
