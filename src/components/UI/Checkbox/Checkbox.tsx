import React, { FC, ChangeEvent, memo } from "react";
import classNames from "classnames";

import { Input } from "@/components/UI/Input";

import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  child: string | JSX.Element;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isDisabled?: boolean;
  isStrong?: boolean;
};

export const Checkbox: FC<CheckboxProps> = memo((props) => {
  const { child, onChange, isChecked, isStrong, className } = props;
  const isDisabled = props.isDisabled || false;

  const textStyle = classNames(styles.text, {
    [styles.disabledtext]: isDisabled,
  });

  let appendElement: string | JSX.Element = child;
  if (typeof child === "string" && isStrong) {
    appendElement = <strong>{child}</strong>;
  }

  return (
    <label className={classNames(styles.Checkbox, className)}>
      <Input
        className={styles.Input}
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
        disabled={isDisabled}
      />
      <span className={styles.checkmark} />
      <span className={textStyle}>{appendElement}</span>
    </label>
  );
});
