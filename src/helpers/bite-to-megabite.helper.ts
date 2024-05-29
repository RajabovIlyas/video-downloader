export const getBiteToMegaBite = (bite: string | number) =>
  (Number(bite || 0) / Math.pow(1024, 2)).toFixed(2);
