import { endOfMonth, format, startOfMonth } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const formatYear = (date: Date) => {
  return format(date, "yyyy");
};

export const formatYearMonth = (date: Date) => {
  return format(date, "yyyy-MM");
};

export const formatStartDateOfMonth = (date: Date) => {
  const firstDayOfMonth = startOfMonth(date);
  return format(firstDayOfMonth, "yyyy-MM-dd");
};

export const formatEndDateOfMonth = (date: Date) => {
  const lastDayOfMonth = endOfMonth(date);
  return format(lastDayOfMonth, "yyyy-MM-dd");
};
