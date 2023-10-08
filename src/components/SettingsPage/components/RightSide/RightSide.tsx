import React, { FC } from "react";

import { Description } from "@/components/SettingsPage/components/Description";
import { Tracks } from "@/components/SettingsPage/components/Tracks";
import { Settings } from "@/components/SettingsPage/components/Settings";

import {
  SettingsPageDispatch,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";

import {
  PropsDispatchAndState,
  PropsWithClassName,
} from "@/shared/types/component";

type RightSideProps = PropsWithClassName &
  PropsDispatchAndState<SettingsPageDispatch, SettingsPageState>;

export const RightSide: FC<RightSideProps> = (props) => {
  const { dispatch, state, className } = props;

  return (
    <div className={className}>
      <Description type={state.showOnRight} />
      <Tracks dispatch={dispatch} state={state} />
      <Settings dispatch={dispatch} state={state} />
    </div>
  );
};
