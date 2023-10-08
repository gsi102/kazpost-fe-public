import React, { ChangeEvent, FC, useCallback, useState } from "react";

import { Select, AdvicedClause, Checkbox } from "@/components/UI";

import { AdviceTrack, CheckboxTrackText } from "./Settings.constants";

import {
  SettingsPageDispatch,
  SettingsPageActionKind,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";

import { PropsDispatchAndState } from "@/shared/types/component";

import styles from "./Settings.module.scss";
import { SettingsFrom } from "../SettingsFrom";

const { SELECTED_ATTRIBUTE, FROM_CREDENTIALS } = SettingsPageActionKind;

export const Settings: FC<
  PropsDispatchAndState<SettingsPageDispatch, SettingsPageState>
> = (props) => {
  const { dispatch, state } = props;
  if (state.showOnRight !== "settings") return null;

  const { attributeFieldsMS, selectedAttribute, from } = state;
  const options = attributeFieldsMS ? attributeFieldsMS : new Array(0);

  const [isChecked, setIsChecked] = useState<boolean>(!!selectedAttribute);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const attributeId = e.target.value;
    const found = attributeFieldsMS?.find((el) => el.id === attributeId);
    if (!found) return;
    dispatch({ type: SELECTED_ATTRIBUTE, payload: found });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const flag = e.target.checked;
    setIsChecked(flag);
    !flag && dispatch({ type: SELECTED_ATTRIBUTE, payload: null });
  };

  const onChangeFrom = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      fromProp: keyof SettingsPageState["from"]
    ) => {
      const value = e.target.value;
      const newFrom = { ...from, [fromProp]: value };
      dispatch({ type: FROM_CREDENTIALS, payload: newFrom });
      return;
    },
    [from]
  );

  return (
    <div>
      <div className={styles.marginBottom}>
        <AdvicedClause advice={AdviceTrack} className={styles.marginBottom}>
          <span className="h2">
            Выберите дополнительное поле типа "Ссылка", куда вставить ссылку для
            отслеживания:
          </span>
        </AdvicedClause>
        <div className={styles.row}>
          <Checkbox
            onChange={onChangeInput}
            isChecked={isChecked}
            child={CheckboxTrackText}
            isDisabled={!attributeFieldsMS}
          />
          <Select
            options={options}
            selectedValue={selectedAttribute?.id || null}
            onChange={(e) => onChangeSelect(e)}
            className={styles.Select}
            isDisabled={!isChecked || !attributeFieldsMS}
          />
        </div>
      </div>
      <SettingsFrom
        className={styles.marginBottom}
        from={from}
        onChangeFrom={onChangeFrom}
      />
    </div>
  );
};
