import { Server } from "@/api/Server";
import { Op } from "@/shared/types/index";

import { AccountsColumn, DBTable } from "@/shared/types";

type DbData = {
  [col in AccountsColumn]?: string[] | number | string | boolean | null;
};
type Where = {
  [column in AccountsColumn]?: {
    [o in Op]?: string | number;
  };
};

type GetDataBody = {
  table: DBTable;
  getColumns: Array<AccountsColumn>;
  where?: Where;
};
type GetData = GetDataBody & {
  accountId: string;
};

type CreateDataBody = {
  table: DBTable;
  dbData: DbData;
};
type CreateData = CreateDataBody & {
  accountId: string;
};

type UpdateDataBody = {
  table: DBTable;
  dbData: DbData;
  where: Where;
};
type UpdateData = UpdateDataBody & {
  accountId: string;
};

class DBServiceClass {
  async getData(data: GetData): Promise<any> {
    const { accountId, table, getColumns, where } = data;

    let body: GetDataBody = {
      table,
      getColumns,
    };

    if (where) body.where = where;

    return Server.post(`/db/${accountId}`, body)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }

  async createData(data: CreateData): Promise<any> {
    const { accountId, table, dbData } = data;

    const body: CreateDataBody = {
      table,
      dbData,
    };

    return Server.put(`/db/${accountId}`, body).catch((err) => {
      throw err;
    });
  }

  async updateData(data: UpdateData): Promise<any> {
    const { accountId, table, dbData, where } = data;

    const body: UpdateDataBody = {
      table,
      dbData,
      where,
    };

    return Server.patch(`/db/${accountId}`, body).catch((err) => {
      throw err;
    });
  }
}

export const DBService = new DBServiceClass();
export type { DbData };
