import React, { FC, useCallback, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Preloader, RequestStatus } from "@/components//UI";

import { Nullable } from "@/shared/types/helpers";

import { WidgetController, ReportsController } from "@/api/controllers";

import { initialState, WidgetReducer } from "@/components/Widget/reducer";

import styles from "./Widget.module.scss";

let firstEvent: Nullable<Record<string, MessageEvent["data"]>> = null;
function interceptor(e: MessageEvent<any>) {
  firstEvent = { data: e.data };
  window.removeEventListener("message", interceptor);
}
window.addEventListener("message", interceptor);

export const Widget: FC = () => {
  const { search } = useLocation();

  const [state, dispatch] = useReducer(WidgetReducer, initialState);
  const [isPreloader, setIsPreloader] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<Nullable<boolean>>(null);

  const downloadInvoice = useCallback(async () => {
    const { accountId, reportData } = state;
    setIsPreloader(true);

    const blob = await ReportsController.getReportFile(accountId, reportData)
      .catch(() => setIsSuccess(false))
      .finally(() => {
        setIsPreloader(false);
        setTimeout(() => setIsSuccess(null), 1500);
      });

    if (!blob) return;

    const fileURL = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = fileURL;
    a.download = state.objectName + ".pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(fileURL);
    a.remove();
    return;
  }, [state]);

  useEffect(() => {
    const funcToCall = async (
      event: MessageEvent | Record<string, MessageEvent["data"]>
    ) => {
      firstEvent = firstEvent && null;
      const message = event.data;
      setIsPreloader(true);
      return WidgetController.newMessage(
        dispatch,
        state,
        message,
        search
      ).finally(() => setIsPreloader(false));
    };

    window.addEventListener("message", funcToCall);
    firstEvent && funcToCall(firstEvent);

    return () => {
      window.removeEventListener("message", funcToCall);
    };
  }, [dispatch, state, search]);

  // console.log({ kazpostState: state });

  return (
    <div className={styles.Widget}>
      <Preloader isPreloader={isPreloader} className={styles.Preloader}>
        <Button onClick={downloadInvoice} className={styles.Button}>
          Скачать адресный ярлык
        </Button>
      </Preloader>
      <RequestStatus isSuccess={isSuccess} className={styles.RequestStatus} />
    </div>
  );
};
