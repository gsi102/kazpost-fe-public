import _ from "lodash";

import { MoySkladService } from "@/api/services";

import { DBService } from "@/api/services/";

import { parseDbResponse } from "@/shared/helpers/parseDbResponse";
import { hasOwnProp } from "@/shared/helpers/hasOwnProp";

import {
  initialState,
  SettingsPageState,
  SettingsPageDispatch,
  SettingsPageActionKind,
} from "@/components/SettingsPage/reducer";

import {
  AccountsColumn,
  DBTable,
  Entity,
  EntityAttribute,
  EntityData,
  Op,
} from "@/shared/types";
import type { DbData } from "@/api/services/";

import { ItemsRequestLimit } from "@/shared/const";

const { BULK_SET_STATE } = SettingsPageActionKind;

class SettingsPageClass {
  async onOpen(
    dispatch: SettingsPageDispatch,
    contextKey: string
  ): Promise<void> {
    let bulkDispatch = {} as SettingsPageState;

    const table = DBTable.Accounts;
    const getColumns = [
      AccountsColumn.IsActive,
      AccountsColumn.TrackAttributeId,
      AccountsColumn.PersonFrom,
      AccountsColumn.PhoneFrom,
      AccountsColumn.ZipFrom,
      AccountsColumn.AddressFrom,
    ];

    const accountId = await MoySkladService.getContext(contextKey).then(
      (context) => context.accountId
    );
    bulkDispatch.accountId = accountId;

    let accountSettings = await DBService.getData({
      accountId,
      table,
      getColumns,
    }).then((result) => {
      if (!result) return null;
      return _.cloneDeep(parseDbResponse(result, initialState));
    });

    if (accountSettings === null) return;

    // bulkDispatch.isActive = !!accountSettings[AccountsColumn.IsActive];
    bulkDispatch.from = {
      [AccountsColumn.PersonFrom]: accountSettings[AccountsColumn.PersonFrom],
      [AccountsColumn.PhoneFrom]: accountSettings[AccountsColumn.PhoneFrom],
      [AccountsColumn.ZipFrom]: accountSettings[AccountsColumn.ZipFrom],
      [AccountsColumn.AddressFrom]: accountSettings[AccountsColumn.AddressFrom],
    };

    const MSData = await MoySkladService.getData({
      accountId,
      entity: Entity.customerorder,
      dataType: EntityData.metadata,
      expand: ["attributes"],
    }).catch((err) => {
      throw err;
    });

    const customerorders = await MoySkladService.getData({
      accountId,
      entity: Entity.customerorder,
      limit: ItemsRequestLimit,
      expand: ["agent", "attributes"],
      order: ["created,desc"],
    })
      .then((response) => response.rows)
      .catch((err) => {
        throw err;
      });
    if (customerorders) {
      bulkDispatch.customerorders = customerorders;
      bulkDispatch.showCustomerorders = customerorders;
    }

    /** Фильтрация атрибутов */
    if (hasOwnProp(MSData, "attributes")) {
      const attributes: EntityAttribute[] = MSData.attributes.rows.filter(
        (attribute: EntityAttribute) => attribute.type === "link"
      );

      if (attributes.length > 0) {
        bulkDispatch.attributeFieldsMS = attributes;
        const found = attributes.find(
          (el) => el.id === accountSettings?.[AccountsColumn.TrackAttributeId]
        );
        bulkDispatch.selectedAttribute =
          found || initialState.selectedAttribute;
      }
    }

    dispatch({ type: BULK_SET_STATE, payload: bulkDispatch });
    return;
  }

  async onSubmit(state: SettingsPageState) {
    const { accountId, selectedAttribute, from } = state;
    if (!accountId) throw new Error("Нет accountId");

    const table = DBTable.Accounts;
    const where = {
      [AccountsColumn.Id]: {
        [Op.eq]: accountId,
      },
    };
    let dbData = {} as DbData;
    // dbData[AccountsColumn.IsActive] = +isActive;
    dbData[AccountsColumn.TrackAttributeId] = selectedAttribute?.id || null;
    dbData[AccountsColumn.PersonFrom] = from[AccountsColumn.PersonFrom] || null;
    dbData[AccountsColumn.PhoneFrom] = from[AccountsColumn.PhoneFrom] || null;
    dbData[AccountsColumn.ZipFrom] = from[AccountsColumn.ZipFrom] || null;
    dbData[AccountsColumn.AddressFrom] =
      from[AccountsColumn.AddressFrom] || null;

    try {
      return DBService.updateData({
        accountId,
        table,
        dbData,
        where,
      });
    } catch (err) {
      throw err;
    }
  }
}

export const SettingsPageService = new SettingsPageClass();
