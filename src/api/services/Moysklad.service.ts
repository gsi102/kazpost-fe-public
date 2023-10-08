import { Server } from "@/api/Server";
import {
  Customerorder,
  Entity,
  EntityData,
  OrderCustomerorder,
} from "@/shared/types";

type GetData = {
  accountId: string;
  entity?: Entity;
  entityId?: string;
  dataType?: EntityData;
  limit?: number;
  offset?: number;
  order?: Array<OrderCustomerorder>;
  expand?: Array<string>;
  filter?: {
    [k in keyof Customerorder]?: Array<string>;
  };
  search?: string;
};
type GetDataBody = Omit<GetData, "order" | "expand" | "filter"> & {
  order?: string;
  expand?: string;
  filter?: string;
};

type ChangeDataBody = {
  accountId: string;
  objectId: string;
  dataToUpdate: { [k: string]: any };
};
type ChangeData = ChangeDataBody & {
  entity: Entity;
};

type ChangeAttributeValue = {
  accountId: string;
  attributeId: string;
  value: string | number | boolean | null;
  entity: Entity;
  objectId: string;
};

class MoySkladServiceClass {
  async getContext(contextKey: string): Promise<any> {
    return Server.get(`/moysklad/context/${contextKey}`)
      .then((response) => response.data.context)
      .catch((err) => {
        throw err;
      });
  }

  async getData(data: GetData): Promise<any> {
    const {
      accountId,
      entity,
      entityId,
      dataType,
      filter,
      expand,
      offset,
      limit,
      order,
      search,
    } = data;

    let url = "/moysklad/entity";
    if (entity) url += "/" + entity;

    const body: GetDataBody = {
      accountId,
    };

    if (entityId) body.entityId = entityId;
    if (dataType) body.dataType = dataType;
    if (filter) {
      let filterString = "";
      for (const [key, value] of Object.entries(filter)) {
        value?.forEach((filterValue) => {
          filterString += key + "=" + filterValue + ";";
        });
      }
      filterString = filterString.slice(0, -1);
      body.filter = filterString;
    }
    if (expand) body.expand = expand.join(",");
    if (offset) body.offset = offset;
    if (limit) body.limit = limit;
    if (order) body.order = order.join(";");
    if (search) body.search = search;

    return Server.post(url, body)
      .then((response) => response.data.entityData)
      .catch((err) => {
        throw err;
      });
  }

  async changeData(data: ChangeData): Promise<any> {
    const { entity, objectId, accountId, dataToUpdate } = data;
    let url = `moysklad/entity/${entity}`;

    const body: ChangeDataBody = {
      objectId,
      accountId,
      dataToUpdate,
    };

    return Server.put(url, body)
      .then((result) => result.data.entityData)
      .catch((err) => {
        throw err;
      });
  }

  async changeAttributeValue(data: ChangeAttributeValue): Promise<void> {
    const { attributeId, value, entity, objectId, accountId } = data;

    let url = "https://online.moysklad.ru/api/remap/1.2/entity/" + entity;
    const dataToUpdate = {
      attributes: [
        {
          meta: {
            href: url + "/" + EntityData.attributes + "/" + attributeId,
            type: "attributemetadata",
            mediaType: "application/json",
          },
          value,
        },
      ],
    };

    return this.changeData({
      entity,
      objectId,
      accountId,
      dataToUpdate,
    }).catch((err) => {
      throw err;
    });
  }
}

export const MoySkladService = new MoySkladServiceClass();
export type { GetData };
