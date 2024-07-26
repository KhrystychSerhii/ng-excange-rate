export const get = <T, K extends keyof T>(obj: T, path: string | string[], defaultValue?: any): K | any => {
  const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key.length);
  const result = pathArray.reduce((acc: any, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  return result === undefined ? defaultValue : result;
}
