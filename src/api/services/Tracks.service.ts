import _ from "lodash";
import { Server } from "@/api/Server";
import { MoySkladService } from "@/api/services";

import { ItemsRequestLimit } from "@/shared/const";

import { Customerorder, Entity, EntityAttribute } from "@/shared/types";
import {
  SettingsPageDispatch,
  SettingsPageActionKind,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";

const { IS_ALL_LOADED, CUSTOMERORDERS, SHOW_CUSTOMERORDERS } =
  SettingsPageActionKind;

class TracksClass {
  async getTracksTemplate() {
    let url = `/templates/tracks/xls`;

    return Server.get(url, { responseType: "blob" })
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }

  async onSearch(
    dispatch: SettingsPageDispatch,
    accountId: string,
    text: string
  ): Promise<void> {
    const found: Customerorder[] = await MoySkladService.getData({
      accountId,
      entity: Entity.customerorder,
      search: text,
      expand: ["agent", "attributes"],
      order: ["created,desc"],
    })
      .then((response) => response.rows)
      .catch((err) => {
        throw err;
      });

    dispatch({ type: SHOW_CUSTOMERORDERS, payload: found });
    return;
  }

  async loadMoreOrders(
    dispatch: SettingsPageDispatch,
    accountId: string,
    customerorders: Customerorder[] | null
  ) {
    const offset = customerorders ? customerorders.length : 0;

    let moreOrders: Customerorder[] = await MoySkladService.getData({
      accountId,
      entity: Entity.customerorder,
      limit: ItemsRequestLimit,
      offset,
      expand: ["agent", "attributes"],
      order: ["created,desc"],
    })
      .then((response) => response.rows)
      .catch((err) => {
        throw err;
      });

    if (!moreOrders || moreOrders.length < 1) {
      dispatch({ type: IS_ALL_LOADED, payload: true });
      return;
    }

    /** Если за время работы с треками будет создан новый заказ,
     * то offset сдвинется и 1 заказ задублируется */
    moreOrders = moreOrders.filter(
      (loadedOrder) =>
        !customerorders?.find((existed) => existed.id === loadedOrder.id)
    );

    const newOrders = customerorders
      ? [...customerorders, ...moreOrders]
      : moreOrders;

    dispatch({ type: CUSTOMERORDERS, payload: newOrders });
    dispatch({ type: SHOW_CUSTOMERORDERS, payload: newOrders });
    return;
  }

  async updateTrack(
    dispatch: SettingsPageDispatch,
    state: SettingsPageState,
    documentId: string,
    trackFullUrl: string | null
  ) {
    const { accountId, selectedAttribute, customerorders, showCustomerorders } =
      state;
    const attributeId = selectedAttribute?.id;
    if (!attributeId || !accountId) return;

    await MoySkladService.changeAttributeValue({
      attributeId,
      value: trackFullUrl,
      entity: Entity.customerorder,
      objectId: documentId,
      accountId,
    }).catch((err) => {
      throw err;
    });

    const commonData = { selectedAttribute, documentId, trackFullUrl };
    const newOrders = this.editTrackInState(customerorders, commonData);
    const newShowOrders = this.editTrackInState(showCustomerorders, commonData);

    dispatch({ type: CUSTOMERORDERS, payload: newOrders });
    dispatch({ type: SHOW_CUSTOMERORDERS, payload: newShowOrders });
  }

  editTrackInState(
    initialArr: any[] | null,
    commonData: {
      selectedAttribute: EntityAttribute | null;
      documentId: string;
      trackFullUrl: string | null;
    }
  ) {
    if (!initialArr) return initialArr;
    const { selectedAttribute, documentId, trackFullUrl } = commonData;

    const temp: Customerorder[] = _.cloneDeep(initialArr);
    const found = temp.find((el) => el.id === documentId);
    if (!selectedAttribute || !found) return initialArr;

    const attribute = found.attributes?.find(
      (attribute) => attribute.id === selectedAttribute.id
    );

    if (attribute) attribute.value = trackFullUrl;
    else {
      const newAttribute: EntityAttribute = {
        id: selectedAttribute.id,
        meta: { ...selectedAttribute.meta },
        name: selectedAttribute.name,
        type: selectedAttribute.type,
        value: trackFullUrl,
      };

      if (found.attributes) found.attributes.push(newAttribute);
      else found.attributes = [newAttribute];
    }

    return _.cloneDeep(temp);
  }

  async sendTracksFile(accountId: string, attributeId: string, file: File) {
    const formData = new FormData();
    formData.append("tracksFile", file, file.name);
    formData.append("accountId", accountId);
    formData.append("attributeId", attributeId);

    const url = `/tracks/upload`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return Server.post(url, formData, config)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }
}

export const TracksService = new TracksClass();
