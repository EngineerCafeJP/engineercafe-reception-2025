import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { fetchBelongTranslationsByLocale } from "@/app/queries/belong-translations-queries";
import { fetchFoundTranslationsByLocale } from "@/app/queries/found-translations-queries";
import { fetchJobTranslationsByLocale } from "@/app/queries/job-translations-queries";
import { fetchPrefectureTranslationsByLocale } from "@/app/queries/prefecture-translations-queries";
import supabase from "@/utils/supabase/client";

export function useRegistrationOptions(locale: string) {
  const {
    isPending: isFetchPrefecturesPending,
    isError: isFetchPrefecturesError,
    data: prefectures,
  } = useQuery(fetchPrefectureTranslationsByLocale(supabase, locale));
  const {
    isPending: isFetchBelongsPending,
    isError: isFetchBelongsError,
    data: belongs,
  } = useQuery(fetchBelongTranslationsByLocale(supabase, locale));
  const {
    isPending: isFetchJobsPending,
    isError: isFetchJobsError,
    data: jobs,
  } = useQuery(fetchJobTranslationsByLocale(supabase, locale));
  const {
    isPending: isFetchFoundsPending,
    isError: isFetchFoundsError,
    data: founds,
  } = useQuery(fetchFoundTranslationsByLocale(supabase, locale));

  return {
    isPending:
      isFetchPrefecturesPending ||
      isFetchBelongsPending ||
      isFetchJobsPending ||
      isFetchFoundsPending,
    isError:
      isFetchPrefecturesError ||
      isFetchBelongsError ||
      isFetchJobsError ||
      isFetchFoundsError,
    prefectures,
    belongs,
    jobs,
    founds,
  };
}
