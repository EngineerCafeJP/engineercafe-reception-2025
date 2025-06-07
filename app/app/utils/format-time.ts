import { format } from "date-fns";

const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  return format(date, "HH:mm");
};

// 15分単位
const formatTimeWithQuarter = (timeString: string | null) => {
  if (!timeString) return "";

  const date = new Date(timeString);
  date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
  return format(date, "HH:mm");
};

const addHours = (timeString: string, hours: number) => {
  const date = new Date(timeString);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

export { formatTime, formatTimeWithQuarter, addHours };
