import React, { FC, memo } from "react";
import classNames from "classnames";

import { Nullable } from "@/shared/types/helpers";

import styles from "./Select.module.scss";

type Option = {
  id: string;
  name: string;
  [k: string]: unknown;
};

type SelectProps = {
  options?: Array<Option>;
  selectedValue: Nullable<string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
  className?: string;
};

export const Select: FC<SelectProps> = memo((props) => {
  const { options, onChange, className, isDisabled, selectedValue } = props;

  const isItems = options && options?.length > 0;
  if (!options || !isItems) {
    return (
      <span
        className="caption"
        style={{ marginLeft: "1rem", color: "#b2b2b2" }}
      >
        Нет доступных опций.
      </span>
    );
  }

  return (
    <div className={classNames(styles.SelectWrapper, className)}>
      <select
        onChange={onChange}
        className={styles.Select}
        disabled={isDisabled}
        value={selectedValue || "default"}
      >
        <option value="default" hidden></option>
        {options.map((option: Option) => {
          const { id, name } = option;

          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
      <span />
    </div>
  );
});
