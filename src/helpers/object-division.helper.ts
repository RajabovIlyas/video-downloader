export const objectDivision = <T>(obj: T, properties: Array<keyof T>) =>
  properties.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as T);
