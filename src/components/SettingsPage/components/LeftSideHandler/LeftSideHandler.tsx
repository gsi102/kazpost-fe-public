import React, { FC, useCallback, useMemo } from "react";

import { Input } from "@/components/UI";

import {
  SettingsPageDispatch,
  SettingsPageActionKind,
  SettingsPageState,
  ShowOnRight,
} from "@/components/SettingsPage/reducer";

import { PropsDispatchAndState } from "@/shared/types/component";

import styles from "./LeftSideHandler.module.scss";

type LeftSideHandlerProps = PropsDispatchAndState<
  SettingsPageDispatch,
  SettingsPageState
> & {
  type: ShowOnRight;
};

const { SHOW_ON_RIGHT, SHOW_CUSTOMERORDERS } = SettingsPageActionKind;

export const LeftSideHandler: FC<LeftSideHandlerProps> = (props) => {
  const { dispatch, state, type } = props;
  const { customerorders } = state;
  const isShow = state.showOnRight === type;

  const name = useMemo(() => {
    switch (type) {
      case "description":
        return "Описание";
      case "settings":
        return "Настройки";
      case "tracks":
        return "Управление трек-номерами";
      default:
        return;
    }
  }, [type]);

  const showOnRight = useCallback(() => {
    // if (!isActive) return;
    dispatch({ type: SHOW_ON_RIGHT, payload: type });
    if (type === "tracks") {
      dispatch({ type: SHOW_CUSTOMERORDERS, payload: customerorders });
    }
  }, [type, customerorders]);

  return (
    <div className={styles.leftSideOption} onClick={showOnRight}>
      <Input
        type="checkbox"
        // disabled={!isActive}
        checked={isShow}
      />
      <span>{name}</span>
    </div>
  );
};
