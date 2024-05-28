export const getBiteToMegaBite = (bite: string | number) =>
  (Number(bite) / Math.pow(1024, 2)).toFixed(2);
