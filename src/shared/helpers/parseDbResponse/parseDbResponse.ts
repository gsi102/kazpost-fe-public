import { WidgetState } from "@/components/Widget/reducer";
import { SettingsPageState } from "@/components/SettingsPage/reducer";

import { isObjectProperty } from "../isObjectProperty";
import { AccountsColumn } from "@/shared/types";

type ValuesTypesDB = null | number | string | Record<string, number[]>;

const findInitialValue = (
  key: string,
  state: WidgetState | SettingsPageState
): any => {
  let found = null;
  for (const [initialProp, initialVal] of Object.entries(state)) {
    if (key === initialProp) {
      return initialVal;
    }

    const isNull = initialVal === null;
    const isMap = initialVal instanceof Map;
    const isArray = Array.isArray(initialVal);
    const isObject = typeof initialVal === "object";

    if (isObject && !isNull && !isArray && !isMap) {
      found = findInitialValue(key, initialVal);
      if (found) break;
    }
  }
  return found;
};

const exceptions = [
  AccountsColumn.PersonFrom,
  AccountsColumn.PhoneFrom,
  AccountsColumn.ZipFrom,
  AccountsColumn.AddressFrom,
];
export const parseDbResponse = (
  response: Record<string, ValuesTypesDB>,
  initialState: WidgetState | SettingsPageState
): Record<string, any> => {
  const state = {} as Record<
    string,
    ValuesTypesDB | string[] | Record<string, string[]>
  >;

  for (const [key, value] of Object.entries(response)) {
    // Рекурсивно найти ключ в initialState
    if (!value) {
      state[key] = findInitialValue(key, initialState);
      continue;
    }

    if (exceptions.includes(key as AccountsColumn)) {
      state[key] = value;
      continue;
    }

    switch (typeof value) {
      case "object":
        /** Например, значение колонки типа BIT приходит как объект с полем data */
        const isBIT =
          isObjectProperty(value, "data") &&
          Array.isArray(value.data) &&
          value.data.length;

        if (isBIT) state[key] = value.data[0];
        break;
      case "string":
        if (value.includes(":")) {
          const parsedString = {} as Record<string, any[]>;
          const re = /[^;]+/gm;
          const result = value.match(re);
          if (!result) break;

          result.forEach((str) => {
            const endIndex = str.length;
            const indexOfKey = str.indexOf(":");
            const prop = str.slice(0, indexOfKey);
            str = str.slice(indexOfKey + 1, endIndex);
            parsedString[prop] = str ? str.split(",") : new Array(0);
          });

          state[key] = parsedString;
          break;
        } else if (value.includes(";")) {
          const arr = value.split(";");
          arr.forEach((el) => el.split(","));
          state[key] = arr;
          break;
        } else if (value.includes(",")) {
          state[key] = value.split(",");
          break;
        }
      // no break intentionally
      default:
        state[key] = value;
    }
  }

  return JSON.parse(JSON.stringify(state));
};
