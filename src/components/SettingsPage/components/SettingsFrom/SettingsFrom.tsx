import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";

import { AdvicedClause, Input } from "@/components/UI";

import { SettingsPageState } from "@/components/SettingsPage/reducer";

import {
  AdviceSender,
  fromDictionary,
  fieldNameStyle,
} from "./SettingsForm.constants";

import styles from "./SettingsFrom.module.scss";

type SettingsFrom = {
  className: string;
  onChangeFrom: (
    e: ChangeEvent<HTMLInputElement>,
    actionType: keyof SettingsPageState["from"]
  ) => void;
  from: SettingsPageState["from"];
};

export const SettingsFrom: FC<SettingsFrom> = (props) => {
  const { onChangeFrom, className, from } = props;

  return (
    <div className={classNames(className, styles.SettingsFrom)}>
      <AdvicedClause advice={AdviceSender} className={styles.marginBottom}>
        <span className="h2">Адрес отправителя:</span>
      </AdvicedClause>

      <div className="flexColumn gap-1">
        {Object.entries(fromDictionary).map(([key, val]) => {
          const { name, maxLength } = val;
          const fromProp = key as keyof SettingsPageState["from"];
          const currentValue = from[fromProp];
          const len = currentValue?.length || 0;
          const isCap = len === maxLength;
          const capStyle = classNames({
            [styles.symbolsCount]: !isCap,
            [styles.symbolsCap]: isCap,
          });

          return (
            <div>
              <span style={fieldNameStyle}>{name}</span>
              <Input
                className={styles.Input}
                maxLength={maxLength}
                value={currentValue || ""}
                onChange={(e) => onChangeFrom(e, fromProp)}
              />
              <span className={capStyle}>
                {len}/{maxLength}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
