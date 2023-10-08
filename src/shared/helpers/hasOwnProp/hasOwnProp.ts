export const hasOwnProp = (obj: Record<string, unknown>, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop);
