enum ChangeHint {
  _fields = "_fields",
  positions = "positions",
  attributes = "attributes",
}

enum MessageName {
  Open = "Open",
  Change = "Change",
  Save = "Save",
  ShowPopupResponse = "ShowPopupResponse",
  InvalidMessageError = "InvalidMessageError",
}

enum ExtensionPoint {
  customerorder = "document.customerorder.edit",
  demand = "document.demand.edit",
}

type PostMessage = {
  name: MessageName;
  extensionPoint: ExtensionPoint;
  objectId: string;
  messageId: number;
  displayMode: "expanded";
};

export { ChangeHint, MessageName, ExtensionPoint };
export type { PostMessage };
