enum Entity {
  customerorder = "customerorder",
  demand = "demand",
  move = "move",
  product = "product",
  bundle = "bundle",
  bundlecomponent = "bundlecomponent",
  service = "service",
  store = "store",
  saleschannel = "saleschannel",
  salesreturn = "salesreturn",
  counterparty = "counterparty",
  productfolder = "productfolder",
  employee = "employee",
  group = "group",
  currency = "currency",
  organization = "organization",
  state = "state",
  files = "files",
  customerorderposition = "customerorderposition",
  account = "account",
  attributemetadata = "attributemetadata",
}
const EntityName: { [k in Entity]?: string } = {
  customerorder: "Заказ покупателя",
  demand: "Отгрузка",
  move: "Перемещение",
  salesreturn: "Возврат покупателя",
};

enum EntityData {
  metadata = "metadata",
  audit = "audit",
  positions = "positions",
  attributes = "metadata/attributes",
  applicable = "applicable",
  state = "state",
  tags = "tags",
  salesChannel = "salesChannel",
  agent = "agent",
  name = "name",
  store = "store",
  components = "components",
}

export { Entity, EntityName, EntityData };
