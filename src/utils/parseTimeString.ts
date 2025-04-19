export const parseTimeString = (timeStr: string): number => {
  const [hh = "0", mm = "0", ss = "0"] = timeStr.split(":");
  const hours = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);
  const seconds = parseInt(ss, 10);
  return hours * 3600 + minutes * 60 + seconds;
};
