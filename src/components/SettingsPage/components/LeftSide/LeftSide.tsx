import React, { FC, useCallback, useState } from "react";

import { SubmitButton } from "@/components/SettingsPage/components/SubmitButton";
import { LeftSideHandler } from "@/components/SettingsPage/components/LeftSideHandler";

import { SettingsPageController } from "@/api/controllers";

import {
  SettingsPageDispatch,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";

import {
  PropsDispatchAndState,
  PropsWithClassName,
} from "@/shared/types/component";

type LeftSideProps = PropsWithClassName &
  PropsDispatchAndState<SettingsPageDispatch, SettingsPageState>;

export const LeftSide: FC<LeftSideProps> = (props) => {
  const { dispatch, state, className } = props;

  const [isSavePreloader, setIsSavePreloader] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<boolean | null>(
    null
  );

  const onSubmit = useCallback(async () => {
    setIsSavePreloader(true);
    function onSave(isSuccess: boolean) {
      setIsSavePreloader(false);
      setSaveNotification(isSuccess);
      const timeout = setTimeout(() => {
        setSaveNotification(null);
        clearTimeout(timeout);
      }, 5000);
    }

    return SettingsPageController.onSubmit(state)
      .then(() => onSave(true))
      .catch((err) => {
        console.error(err);
        return onSave(false);
      });
  }, [state]);

  return (
    <div className={className}>
      <LeftSideHandler dispatch={dispatch} state={state} type={"description"} />
      <LeftSideHandler dispatch={dispatch} state={state} type={"tracks"} />
      <LeftSideHandler dispatch={dispatch} state={state} type={"settings"} />
      <SubmitButton
        isPreloader={isSavePreloader}
        onSubmit={onSubmit}
        saveNotification={saveNotification}
      />
    </div>
  );
};
