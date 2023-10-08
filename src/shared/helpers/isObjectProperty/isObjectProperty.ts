import { Optional } from "@/shared/types/helpers";

export const isObjectProperty = (
  object: Optional<Record<string, unknown>>,
  prop: string
): boolean =>
  Boolean(
    object && Object.prototype.hasOwnProperty.call(object, prop) && object[prop]
  );
