import React, { memo } from "react";

import FileIcon from "@/shared/assets/icons/fileIcon.svg";

import { PropsWithOptionalDeletion } from "./FileUpload.types";

import styles from "./FileUpload.module.scss";

type FileInputErrorProps = PropsWithOptionalDeletion;

export const FileUploadError = memo(({ onDelete }: FileInputErrorProps) => (
  <div className={styles.errorFile}>
    <span className={styles.fileStatus}>
      <FileIcon />
      Ошибка
    </span>
    <span className={styles.fileName}>
      Что-то пошло не так. Пожалуйста, попробуйте еще раз
    </span>
    <button onClick={onDelete} className={styles.handleFile} type="button">
      Еще раз
    </button>
  </div>
));
