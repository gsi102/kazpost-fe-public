export const getDateFormated = (date?: string): string => {
  const timestamp = date ? new Date(date) : new Date();
  const offset = timestamp.getTimezoneOffset() * 60 * 1000;
  const dateMSK = timestamp.getTime() + offset + 3 * 60 * 60 * 1000;
  const now = new Date(dateMSK);
  const hour = ("0" + now.getHours()).slice(-2);
  const minute = ("0" + now.getMinutes()).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  return day + "/" + month + " в " + hour + ":" + minute;
};
