import { TracksService } from "@/api/services";

import { Nullable, Optional } from "@/shared/types/helpers";

import {
  SettingsPageDispatch,
  SettingsPageActionKind,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";

import { Customerorder } from "@/shared/types";

import { KazpostTrackUrl } from "@/shared/const";

type LoadMoreOrders = {
  dispatch: SettingsPageDispatch;
  accountId: Nullable<string>;
  customerorders: Nullable<Customerorder[]>;
  isAllLoaded: boolean;
};

type UpdateTrack = {
  dispatch: SettingsPageDispatch;
  state: SettingsPageState;
  documentId: string;
  value: string;
};

const { SHOW_CUSTOMERORDERS } = SettingsPageActionKind;

class TracksClass {
  async getTracksTemplate(): Promise<any> {
    return TracksService.getTracksTemplate().catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async onSearch(
    dispatch: SettingsPageDispatch,
    accountId: Nullable<string>,
    customerorders: Nullable<Customerorder[]>,
    text: string
  ): Promise<void> {
    if (!accountId || !text) {
      !text && dispatch({ type: SHOW_CUSTOMERORDERS, payload: customerorders });
      return;
    }

    return TracksService.onSearch(dispatch, accountId, text).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async loadMoreOrders(data: LoadMoreOrders): Promise<void> {
    const { dispatch, accountId, customerorders, isAllLoaded } = data;
    if (!accountId || isAllLoaded) return;

    return TracksService.loadMoreOrders(
      dispatch,
      accountId,
      customerorders
    ).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async updateTrack(data: UpdateTrack) {
    const { dispatch, state, documentId, value } = data;

    const track = value ? value.toString().toUpperCase() : "";
    const trackFullUrl = track ? KazpostTrackUrl + "/" + track : null;
    await TracksService.updateTrack(
      dispatch,
      state,
      documentId,
      trackFullUrl
    ).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async sendTracksFile(
    accountId: Nullable<string>,
    attributeId: Optional<string>,
    file: Nullable<File>
  ) {
    if (!accountId || !attributeId || !file) {
      const err = new Error("No Data");
      throw err;
    }

    return TracksService.sendTracksFile(accountId, attributeId, file).catch(
      (err) => {
        console.error(err);
        throw err;
      }
    );
  }
}

export const TracksController = new TracksClass();
