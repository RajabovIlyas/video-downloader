export const objectDivision = <T, B>(obj: T, properties: Array<keyof T>): B =>
  properties.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as B);
