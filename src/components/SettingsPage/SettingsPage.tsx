import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { Wrapper } from "@/components/SettingsPage/components/Wrapper";
import { HandlerCheckbox, Preloader } from "@/components/UI";
import { LeftSide } from "@/components/SettingsPage/components/LeftSide";
import { RightSide } from "@/components/SettingsPage/components/RightSide";

import { sendExpand } from "@/shared/helpers/postMessage";

import { HeaderError, TextError } from "./SettingsPage.constants";

import { SettingsPageController } from "@/api/controllers";

import {
  SettingsPageActionKind,
  SettingsPageReducer,
  initialState,
} from "@/components/SettingsPage/reducer";

import styles from "./SettingsPage.module.scss";

const { IS_ACTIVE, SHOW_ON_RIGHT } = SettingsPageActionKind;

let win: Window | null | undefined = null;
window.addEventListener("load", function () {
  win = parent;
});

export const SettingsPage: FC = () => {
  const { search } = useLocation();
  const [state, dispatch] = useReducer(SettingsPageReducer, initialState);
  const [isPreloader, setIsPreloader] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  /** Требование МС */
  useLayoutEffect(() => {
    let interval = setInterval(() => {
      sendExpand(win);
    }, 250);
    return () => {
      clearInterval(interval);
    };
  }, [state]);

  useEffect(() => {
    setIsPreloader(true);
    SettingsPageController.onOpen(dispatch, search)
      .catch(() => setIsNotification(true))
      .finally(() => setIsPreloader(false));
  }, [search]);

  // const setActive = () => {
  //   const isActive = state.isActive;
  //   dispatch({ type: IS_ACTIVE, payload: !isActive });
  //   dispatch({ type: SHOW_ON_RIGHT, payload: "description" });
  // };

  // console.log({ source: "SettingsPage.tsx", data: state });

  if (isPreloader) {
    return <Preloader isPreloader={true} className={styles.Preloader} />;
  }
  if (isNotification) {
    return (
      <Wrapper>
        <div className={styles.error}>
          <div>{HeaderError}</div>
          <div>{TextError}</div>
        </div>
      </Wrapper>
    );
  }

  // let appStatusString = "Приложение ";
  // appStatusString += state.isActive ? "активно" : "отключено";

  return (
    <Wrapper>
      <div className={styles.toggleActive} />
      {/* <div className={styles.toggleActive}>
        <HandlerCheckbox
          child={appStatusString}
          isChecked={state.isActive}
          onChange={setActive}
          onTextClick={setActive}
        />
      </div> */}
      <div className={styles.mainSettings}>
        <LeftSide
          dispatch={dispatch}
          state={state}
          className={styles.gridColumn}
        />
        <RightSide
          dispatch={dispatch}
          state={state}
          className={styles.gridColumn}
        />
      </div>
    </Wrapper>
  );
};
