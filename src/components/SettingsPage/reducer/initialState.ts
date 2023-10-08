import { Customerorder, EntityAttribute } from "@/shared/types";
import { Nullable } from "@/shared/types/helpers";

type ShowOnRight = "tracks" | "settings" | "description";

type SettingsPageState = {
  accountId: Nullable<string>;
  // isActive: boolean;
  showOnRight: ShowOnRight;
  attributeFieldsMS: Nullable<EntityAttribute[]>;
  selectedAttribute: Nullable<EntityAttribute>;
  customerorders: Nullable<Customerorder[]>;
  showCustomerorders: Nullable<Customerorder[]>;
  isAllLoaded: boolean;
  from: {
    personFrom: Nullable<string>;
    phoneFrom: Nullable<string>;
    addressFrom: Nullable<string>;
    zipFrom: Nullable<string>;
  };
};

const initialState = {
  accountId: null,
  // isActive: false,
  showOnRight: "description",
  attributeFieldsMS: null,
  selectedAttribute: null,
  customerorders: null,
  showCustomerorders: null,
  isAllLoaded: false,
  from: {
    personFrom: null,
    phoneFrom: null,
    addressFrom: null,
    zipFrom: null,
  },
} as SettingsPageState;

export type { SettingsPageState, ShowOnRight };
export { initialState };
