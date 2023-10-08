import { Nullable } from "@/shared/types/helpers";

type ReportData = {
  from?: {
    personFrom: Nullable<string>;
    phoneFrom: Nullable<string>;
    addressFrom: Nullable<string>;
    zipFrom: Nullable<string>;
  };
  to: {
    personTo: Nullable<string>;
    phoneTo: Nullable<string>;
    addressTo: Nullable<string>;
    zipTo: Nullable<string>;
  };
  price: Nullable<string>;
  payAmount: Nullable<string>;
};

export type { ReportData };
