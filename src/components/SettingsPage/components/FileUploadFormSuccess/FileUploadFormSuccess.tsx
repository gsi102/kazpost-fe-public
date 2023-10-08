import React from "react";
import classNames from "classnames";
import type { HTMLAttributes } from "react";

import { Button, VisuallyHidden } from "@/components/UI";
import type { ExtendableProps } from "shared/types/component";

import styles from "./FileUploadFormSuccess.module.scss";
import { Nullable } from "@/shared/types/helpers";

type SuccessModalData = {
  total: number;
  errors: number;
  success: number;
};
type FileUploadFormSuccessProps = ExtendableProps<
  HTMLAttributes<HTMLDivElement>,
  {
    onConfirm: () => void;
    successModalData: Nullable<SuccessModalData>;
  }
>;

export const FileUploadFormSuccess = ({
  className,
  onConfirm,
  successModalData,
  ...restProps
}: FileUploadFormSuccessProps) => {
  return (
    <div
      className={classNames(className, styles.FileUploadFormSuccess)}
      {...restProps}
    >
      <VisuallyHidden as="h2">Успешно!</VisuallyHidden>
      <p>Файл успешо загружен. Обновите страницу, чтобы увидеть изменения.</p>
      <div className={styles.statistics}>
        <p>
          <strong>Всего: {successModalData?.total || 0}</strong>
        </p>
        <p>
          <strong>Обновлено: {successModalData?.success || 0}</strong>
        </p>
        <p>
          <strong>Ошибок: {successModalData?.errors || 0}</strong>
        </p>
      </div>
      <Button onClick={onConfirm} className={styles.Button}>
        Вернуться на страницу
      </Button>
    </div>
  );
};

export type { SuccessModalData };
