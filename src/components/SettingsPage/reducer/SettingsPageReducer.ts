import { SettingsPageState } from "./initialState";

enum SettingsPageActionKind {
  ACCOUNT_ID = "ACCOUNT_ID",
  IS_ACTIVE = "IS_ACTIVE",
  SHOW_ON_RIGHT = "SHOW_ON_RIGHT",
  SELECTED_ATTRIBUTE = "SELECTED_ATTRIBUTE",
  CUSTOMERORDERS = "CUSTOMERORDERS",
  SHOW_CUSTOMERORDERS = "SHOW_CUSTOMERORDERS",
  IS_ALL_LOADED = "IS_ALL_LOADED",
  FROM_CREDENTIALS = "FROM_CREDENTIALS",
  BULK_SET_STATE = "BULK_SET_STATE",
}

type SettingsPageAction = {
  type: SettingsPageActionKind;
  payload: any;
};

type SettingsPageDispatch = React.Dispatch<SettingsPageAction>;

const SettingsPageReducer = (
  state: SettingsPageState,
  action: SettingsPageAction
): SettingsPageState => {
  const { type, payload } = action;
  switch (type) {
    case SettingsPageActionKind.ACCOUNT_ID:
      return {
        ...state,
        accountId: payload,
      };
    case SettingsPageActionKind.IS_ACTIVE:
      return {
        ...state,
        isActive: payload,
      };
    case SettingsPageActionKind.SHOW_ON_RIGHT:
      return {
        ...state,
        showOnRight: payload,
      };
    case SettingsPageActionKind.SELECTED_ATTRIBUTE:
      return {
        ...state,
        selectedAttribute: payload,
      };
    case SettingsPageActionKind.CUSTOMERORDERS:
      return {
        ...state,
        customerorders: payload,
      };
    case SettingsPageActionKind.SHOW_CUSTOMERORDERS:
      return {
        ...state,
        showCustomerorders: payload,
      };
    case SettingsPageActionKind.IS_ALL_LOADED:
      return {
        ...state,
        isAllLoaded: payload,
      };
    case SettingsPageActionKind.FROM_CREDENTIALS:
      return {
        ...state,
        from: payload,
      };
    case SettingsPageActionKind.BULK_SET_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export { SettingsPageReducer, SettingsPageActionKind };
export type { SettingsPageDispatch };
