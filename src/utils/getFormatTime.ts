export const getFormattedDate = (time: number) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = Math.floor(time % 60);

  const hh = ("0" + hours).slice(-2);
  const mm = ("0" + mins).slice(-2);
  const ss = ("0" + secs).slice(-2);

  return `${hh}:${mm}:${ss}`;
};
