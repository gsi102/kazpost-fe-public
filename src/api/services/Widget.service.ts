import _ from "lodash";

import { GetData, MoySkladService, ReportsService } from "@/api/services";
import { parseQuery } from "@/shared/helpers/parseQuery";

import { Nullable } from "@/shared/types/helpers";

import {
  WidgetActionKind,
  WidgetDispatch,
  WidgetState,
  initialState,
} from "@/components/Widget/reducer";
import { Entity, ReportData } from "@/shared/types";

const { SET_REPORT_DATA, STATE_BULK_UPDATE } = WidgetActionKind;

class WidgetServiceClass {
  dropState() {
    const initial = _.cloneDeep(initialState) as WidgetState;
    const { personTo, phoneTo, addressTo, zipTo } = initial.reportData.to;

    const reportData = {
      to: {
        personTo,
        phoneTo,
        addressTo,
        zipTo,
      },
      price: initial.reportData.price,
      payAmount: initial.reportData.payAmount,
    };
    return { reportData };
  }

  async openMessageHandler(
    dispatch: WidgetDispatch,
    accountId: Nullable<string>,
    message: any,
    queryParams: string
  ): Promise<void> {
    let bulkDispatch = {} as WidgetState;
    bulkDispatch.correlationId = message.messageId;
    if (!accountId) {
      const params = parseQuery(queryParams);
      const { contextKey } = params;
      const contextMS = await MoySkladService.getContext(contextKey).catch(
        (err) => {
          throw err;
        }
      );
      accountId = contextMS.accountId as string;
      bulkDispatch.accountId = accountId;
    }

    /** Обнуление некоторых полей стейта, т.к. виджет кэшируется
     * (новое взаимодействие виджета с хост-окном) */
    const droppedState = this.dropState();
    bulkDispatch = { ...bulkDispatch, ...droppedState } as WidgetState;

    const objectId = message.objectId;
    const extensionPoint = message.extensionPoint;
    const re = /\.(.*)\./gm;
    const entity = re.exec(extensionPoint)?.[1] as Entity;
    if (!entity) {
      throw new Error(
        "Bad request. Cannot get entity name from extensionPoint"
      );
    }

    const expand = ["agent, agent.id", "organization", "organization.id"];
    const entityData = await MoySkladService.getData({
      accountId,
      entity,
      entityId: objectId,
      expand,
    }).catch((err) => {
      throw err;
    });

    const { to, price, payAmount } = ReportsService.parseAddresses(entityData);
    const reportData: ReportData = {
      to,
      price,
      payAmount,
    };

    bulkDispatch.entity = entity;
    bulkDispatch.objectName = entityData.name;
    bulkDispatch.reportData = { ...bulkDispatch.reportData, ...reportData };

    dispatch({ type: STATE_BULK_UPDATE, payload: bulkDispatch });

    return;
  }

  async saveMessageHandler(
    dispatch: WidgetDispatch,
    state: WidgetState,
    message: any
  ) {
    const objectId = message.objectId;
    const { accountId, entity } = state;

    if (!accountId) {
      throw new Error("No accountId.");
    }

    const expand = ["agent, agent.id", "organization", "organization.id"];
    const data: GetData = {
      accountId,
      entityId: objectId,
      expand,
    };
    if (entity) data.entity = entity;

    const entityData = await MoySkladService.getData(data).catch((err) => {
      throw err;
    });

    const { from, to, price, payAmount } =
      ReportsService.parseAddresses(entityData);
    const reportData: ReportData = {
      from,
      to,
      price,
      payAmount,
    };

    dispatch({ type: SET_REPORT_DATA, payload: reportData });

    return;
  }
}

export const WidgetService = new WidgetServiceClass();
