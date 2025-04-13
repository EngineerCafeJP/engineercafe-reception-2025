import humps from "humps";
import { useEffect, useState } from "react";
import {
  fetchSeatUsageDailyReports,
  fetchSeatUsageMonthlyReport,
  fetchSeatUsageYearlyReport,
} from "@/app/(reception)/queries/seat-usage-report-queries";
import { SeatUsageReport } from "@/app/types/seat-usage-report";

export const useSeatUsageDailyReports = (
  startDate?: string,
  endDate?: string,
) => {
  const [data, setData] = useState<SeatUsageReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (startDate && endDate) {
      fetch(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetch = async (startDate: string, endDate: string) => {
    setIsLoading(true);
    const { data, error } = await fetchSeatUsageDailyReports(
      startDate,
      endDate,
    );

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    const camelizedData = humps.camelizeKeys(data);
    setData(camelizedData as SeatUsageReport[]);
    setIsLoading(false);
  };

  return {
    fetch,
    data,
    isLoading,
    error,
  };
};

export const useSeatUsageMonthlyReport = (yearMonth: string) => {
  const [data, setData] = useState<SeatUsageReport>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(yearMonth);
  }, [yearMonth]);

  const fetch = async (yearMonth: string) => {
    setIsLoading(true);
    const { data, error } = await fetchSeatUsageMonthlyReport(yearMonth);
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    const camelizedData = humps.camelizeKeys(data);
    setData(camelizedData as SeatUsageReport);
    setIsLoading(false);
  };

  return {
    fetch,
    data,
    isLoading,
    error,
  };
};

export const useSeatUsageYearlyReport = (year: string) => {
  const [data, setData] = useState<SeatUsageReport>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(year);
  }, [year]);

  const fetch = async (year: string) => {
    setIsLoading(true);
    const { data, error } = await fetchSeatUsageYearlyReport(year);
    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }
    const camelizedData = humps.camelizeKeys(data);
    setData(camelizedData as SeatUsageReport);
    setIsLoading(false);
  };

  return {
    fetch,
    data,
    isLoading,
    error,
  };
};
