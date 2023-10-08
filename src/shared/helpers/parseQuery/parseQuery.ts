export const parseQuery = (queryParams: string): { [key: string]: string } => {
  const regex1 = /([^&|\n|\t\s|\?]+)/gm;
  let array = null as RegExpExecArray | null;
  let parsed = {} as { [key: string]: string };
  while ((array = regex1.exec(queryParams)) !== null) {
    const pair = array[0];
    const regex2 = /(.*)=(.*)/gm;
    const arr = regex2.exec(pair);
    if (arr && arr.length >= 3) {
      const key = arr[1];
      const value = arr[2];
      parsed[key] = value;
    }
  }

  return JSON.parse(JSON.stringify(parsed));
};
