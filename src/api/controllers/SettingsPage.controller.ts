import { parseQuery } from "@/shared/helpers/parseQuery";

import { SettingsPageService } from "@/api/services";

import {
  SettingsPageState,
  SettingsPageDispatch,
} from "@/components/SettingsPage/reducer";

class SettingsPageClass {
  async onOpen(
    dispatch: SettingsPageDispatch,
    queryParams: string
  ): Promise<void> {
    const { contextKey } = parseQuery(queryParams);
    if (!contextKey) throw new Error("Нет contextKey");

    return SettingsPageService.onOpen(dispatch, contextKey).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async onSubmit(state: SettingsPageState) {
    return SettingsPageService.onSubmit(state).catch((err) => {
      throw err;
    });
  }
}

export const SettingsPageController = new SettingsPageClass();
