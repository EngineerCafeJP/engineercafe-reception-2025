import { PostgrestError } from "@supabase/supabase-js";
import humps from "humps";
import { useEffect, useState } from "react";
import {
  fetchSeatUsageDailyReports,
  fetchSeatUsageMonthlyReports,
  fetchSeatUsageYearlyReports,
} from "@/app/(reception)/queries/seat-usage-report-queries";
import { SeatUsageReport } from "@/app/types/seat-usage-report";

const NO_RECORDS_ERROR_CODE = "PGRST116";

interface RawSeatUsageReport {
  date?: string | null;
  month?: string | null;
  year?: string | null;
  total_fukuoka_city_users: number | null;
  total_fukuoka_pref_users: number | null;
  total_outside_fukuoka_city_users: number | null;
  total_outside_fukuoka_pref_users: number | null;
  total_overseas_users: number | null;
  unique_fukuoka_city_users: number | null;
  unique_fukuoka_pref_users: number | null;
  unique_outside_fukuoka_city_users: number | null;
  unique_outside_fukuoka_pref_users: number | null;
  unique_overseas_users: number | null;
  total_users: number | null;
  unique_users: number | null;
  key: string | null;
}

const convertToSeatUsageReport = (
  data: RawSeatUsageReport | RawSeatUsageReport[] | null,
): SeatUsageReport[] => {
  if (!data) return [];

  const camelizedData = humps.camelizeKeys(data);
  return Array.isArray(camelizedData) ? camelizedData : [camelizedData];
};

const handleErrorResponse = (
  error: PostgrestError | null,
  setData: (data: SeatUsageReport[] | null) => void,
  setError: (error: PostgrestError | null) => void,
) => {
  if (error?.code === NO_RECORDS_ERROR_CODE) {
    setData([]);
    setError(null);
    return;
  }

  if (error) {
    setData(null);
    setError(error);
    return;
  }
};

export const useSeatUsageDailyReports = (
  startDate?: string,
  endDate?: string,
) => {
  const [data, setData] = useState<SeatUsageReport[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    if (startDate && endDate) {
      fetch(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetch = async (startDate: string, endDate: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await fetchSeatUsageDailyReports(
      startDate,
      endDate,
    );

    if (error) {
      handleErrorResponse(error, setData, setError);
      setIsLoading(false);
      return;
    }

    setData(convertToSeatUsageReport(data));
    setIsLoading(false);
  };

  return {
    fetch,
    data,
    isLoading,
    error,
  };
};

export const useSeatUsageMonthlyReports = (yearMonth?: string) => {
  const [data, setData] = useState<SeatUsageReport[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    fetch(yearMonth);
  }, [yearMonth]);

  const fetch = async (yearMonth?: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await fetchSeatUsageMonthlyReports(yearMonth);

    if (error) {
      handleErrorResponse(error, setData, setError);
      setIsLoading(false);
      return;
    }

    setData(convertToSeatUsageReport(data));
    setIsLoading(false);
  };

  return {
    fetch,
    data,
    isLoading,
    error,
  };
};

export const useSeatUsageYearlyReports = (year: string) => {
  const [data, setData] = useState<SeatUsageReport[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    fetch(year);
  }, [year]);

  const fetch = async (year?: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await fetchSeatUsageYearlyReports(year);

    if (error) {
      handleErrorResponse(error, setData, setError);
      setIsLoading(false);
      return;
    }

    setData(convertToSeatUsageReport(data));
    setIsLoading(false);
  };

  return {
    fetch,
    data,
    isLoading,
    error,
  };
};
