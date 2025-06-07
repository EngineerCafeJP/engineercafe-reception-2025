import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import camelcaseKeys from "camelcase-keys";
import { Locale } from "next-intl";
import { fetchBelongTranslationsByLocale } from "@/app/queries/belong-translations-queries";
import { fetchFoundTranslationsByLocale } from "@/app/queries/found-translations-queries";
import { fetchJobTranslationsByLocale } from "@/app/queries/job-translations-queries";
import { fetchPrefectureTranslationsByLocale } from "@/app/queries/prefecture-translations-queries";
import supabase from "@/app/utils/supabase/client";

export function useRegistrationOptions(locale: Locale) {
  const {
    isLoading: isFetchPrefecturesLoading,
    isError: isFetchPrefecturesError,
    data: prefectures,
  } = useQuery(fetchPrefectureTranslationsByLocale(supabase, locale));
  const {
    isLoading: isFetchBelongsLoading,
    isError: isFetchBelongsError,
    data: belongs,
  } = useQuery(fetchBelongTranslationsByLocale(supabase, locale));
  const {
    isLoading: isFetchJobsLoading,
    isError: isFetchJobsError,
    data: jobs,
  } = useQuery(fetchJobTranslationsByLocale(supabase, locale));
  const {
    isLoading: isFetchFoundsLoading,
    isError: isFetchFoundsError,
    data: founds,
  } = useQuery(fetchFoundTranslationsByLocale(supabase, locale));

  return {
    isLoading:
      isFetchPrefecturesLoading ||
      isFetchBelongsLoading ||
      isFetchJobsLoading ||
      isFetchFoundsLoading,
    isError:
      isFetchPrefecturesError ||
      isFetchBelongsError ||
      isFetchJobsError ||
      isFetchFoundsError,
    prefectures: prefectures ? camelcaseKeys(prefectures) : null,
    belongs: belongs ? camelcaseKeys(belongs) : null,
    jobs: jobs ? camelcaseKeys(jobs) : null,
    founds: founds ? camelcaseKeys(founds) : null,
  };
}
