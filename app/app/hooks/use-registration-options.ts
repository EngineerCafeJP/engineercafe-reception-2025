import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import camelcaseKeys from "camelcase-keys";
import { Locale } from "next-intl";
import { fetchBelongTranslationsByLocale } from "@/queries/belong-translations-queries";
import { fetchFoundTranslationsByLocale } from "@/queries/found-translations-queries";
import { fetchJobTranslationsByLocale } from "@/queries/job-translations-queries";
import { fetchPrefectureTranslationsByLocale } from "@/queries/prefecture-translations-queries";
import { fetchStayCategoryTranslationsByLocale } from "@/queries/stay-category-translations-queries";
import supabase from "@/utils/supabase/client";

export function useRegistrationOptions(locale: Locale) {
  const {
    isLoading: isFetchStayCategoriesLoading,
    isError: isFetchStayCategoriesError,
    data: stayCategories,
  } = useQuery(fetchStayCategoryTranslationsByLocale(supabase, locale));
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
      isFetchStayCategoriesLoading ||
      isFetchPrefecturesLoading ||
      isFetchBelongsLoading ||
      isFetchJobsLoading ||
      isFetchFoundsLoading,
    isError:
      isFetchStayCategoriesError ||
      isFetchPrefecturesError ||
      isFetchBelongsError ||
      isFetchJobsError ||
      isFetchFoundsError,
    stayCategories: stayCategories ? camelcaseKeys(stayCategories) : null,
    prefectures: prefectures ? camelcaseKeys(prefectures) : null,
    belongs: belongs ? camelcaseKeys(belongs) : null,
    jobs: jobs ? camelcaseKeys(jobs) : null,
    founds: founds ? camelcaseKeys(founds) : null,
  };
}
