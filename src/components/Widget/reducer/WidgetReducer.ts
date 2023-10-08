import { WidgetState } from "./initialState";

enum WidgetActionKind {
  SET_REPORT_DATA = "SET_REPORT_DATA",
  STATE_BULK_UPDATE = "STATE_BULK_UPDATE",
}

type WidgetAction = {
  type: WidgetActionKind;
  payload: any;
};

type WidgetDispatch = React.Dispatch<WidgetAction>;

const WidgetReducer = (
  state: WidgetState,
  action: WidgetAction
): WidgetState => {
  const { type, payload } = action;
  switch (type) {
    case WidgetActionKind.SET_REPORT_DATA:
      return {
        ...state,
        reportData: payload,
      };
    case WidgetActionKind.STATE_BULK_UPDATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export type { WidgetDispatch };
export { WidgetActionKind, WidgetReducer };
