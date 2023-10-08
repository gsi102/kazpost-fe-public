import { openFeedback } from "@/shared/helpers/postMessage";

import { WidgetService } from "@/api/services";

import { MessageName } from "@/shared/types";
import type { WidgetDispatch, WidgetState } from "@/components/Widget/reducer";

class WidgetControllerClass {
  async newMessage(
    dispatch: WidgetDispatch,
    state: WidgetState,
    message: any,
    queryParams: string
  ): Promise<void | null> {
    const accountId = state.accountId;

    switch (message.name) {
      case MessageName.Open:
        return WidgetService.openMessageHandler(
          dispatch,
          accountId,
          message,
          queryParams
        )
          .then(() => openFeedback(message.messageId))
          .catch((err) => console.error(err));
      case MessageName.Save:
        return WidgetService.saveMessageHandler(dispatch, state, message).catch(
          (err) => console.error(err)
        );
      default:
        return null;
    }
  }
}

export const WidgetController = new WidgetControllerClass();
