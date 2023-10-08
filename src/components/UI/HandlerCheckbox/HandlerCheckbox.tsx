import React, { FC, memo, ChangeEvent } from "react";
import classNames from "classnames";

import { Input } from "@/components/UI";

import styles from "./HandlerCheckbox.module.scss";

type HandlerCheckboxProps = {
  child: string | JSX.Element;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isStrong?: boolean;
  isDisabled?: boolean;
  onTextClick?: () => void;
};

export const HandlerCheckbox: FC<HandlerCheckboxProps> = memo((props) => {
  const { child, isChecked, isStrong, onChange, onTextClick, className } =
    props;

  const isDisabled = props.isDisabled || false;

  const textStyle = classNames(styles.text, {
    [styles.disabledtext]: isDisabled,
  });

  let appendElement: string | JSX.Element = child;
  if (typeof child === "string" && isStrong) {
    appendElement = <strong>{child}</strong>;
  }

  return (
    <div className={classNames(styles.HandlerCheckbox, className)}>
      <label className={styles.container}>
        <Input
          className="check__input"
          type="checkbox"
          onChange={onChange}
          checked={isChecked}
          disabled={isDisabled}
        />
        <span className={styles.checkmark} />
      </label>
      <div className={textStyle} onClick={onTextClick}>
        <span>{child}</span>
      </div>
    </div>
  );
});
