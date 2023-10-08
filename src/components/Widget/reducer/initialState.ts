import { Nullable } from "@/shared/types/helpers";

import { Entity, ReportData } from "@/shared/types";

type WidgetState = {
  accountId: Nullable<string>;
  objectName: Nullable<string>;
  entity: Nullable<Entity>;
  correlationId: Nullable<number>;
  reportData: ReportData;
};

const initialState = {
  accountId: null,
  objectName: null,
  entity: null,
  correlationId: 0,
  reportData: {
    from: {
      personFrom: null,
      phoneFrom: null,
      addressFrom: null,
      zipFrom: null,
    },
    to: {
      personTo: null,
      phoneTo: null,
      addressTo: null,
      zipTo: null,
    },
    price: null,
    payAmount: null,
  },
} as WidgetState;

export type { WidgetState };
export { initialState };
