import React, { FC, ButtonHTMLAttributes, memo, MouseEvent } from "react";
import classNames from "classnames";
import { useDebounce } from "@/shared/hooks/useDebounce";

import styles from "./Button.module.scss";
import { ExtendableProps } from "@/shared/types/component";

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AppButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
  delay?: number;
};
type ButtonProps = ExtendableProps<NativeButtonProps, AppButtonProps>;

export const Button: FC<ButtonProps> = memo((props) => {
  const delay = props.delay || 500;
  const onClickDebounced = props.onClick && useDebounce(props.onClick, delay);

  return (
    <button
      {...props}
      className={classNames(styles.Button, props.className)}
      onClick={onClickDebounced}
    />
  );
});
