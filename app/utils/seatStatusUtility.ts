const getUsageStatus = (startTime: string, endTime: string): string => {
  if (!startTime && !endTime) {
    return "";
  } else if (startTime && endTime) {
    return "退席済み";
  } else if (startTime && !endTime) {
    return "利用中";
  }

  // あり得ないケース
  return "";
};

export { getUsageStatus };
