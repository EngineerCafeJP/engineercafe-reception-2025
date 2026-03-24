import { PREFECTURE_OTHER_ID } from "@/constants/prefectures";
import { Prefecture, User } from "@/types";

const FUKUOKA_CITY = "福岡市";
const UNKNOWN_PREFECTURE_LABEL = "都道府県不明";

const normalize = (value?: string | null) => value?.trim() ?? "";

const findPrefectureName = (
  prefectureId: number,
  prefectures?: Prefecture[] | null,
) => {
  if (!prefectures || prefectureId === PREFECTURE_OTHER_ID) {
    return null;
  }

  return (
    prefectures.find((prefecture) => prefecture.prefectureId === prefectureId)
      ?.name ?? null
  );
};

export const getUserLocationLabel = (
  user: Pick<User, "city" | "prefectureId" | "prefectureOther">,
  prefectures?: Prefecture[] | null,
) => {
  const city = normalize(user.city);

  if (city.includes(FUKUOKA_CITY)) {
    return "市内";
  }

  const prefectureName = findPrefectureName(user.prefectureId, prefectures);
  if (prefectureName) {
    return prefectureName;
  }

  const prefectureOther = normalize(user.prefectureOther);
  if (prefectureOther) {
    return prefectureOther;
  }

  return UNKNOWN_PREFECTURE_LABEL;
};
