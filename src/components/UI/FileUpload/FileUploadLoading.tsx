import React, { memo } from "react";

import Loading from "@/shared/assets/icons/loading.svg";

import { PropsWithNullishFile } from "./FileUpload.types";
import styles from "./FileUpload.module.scss";

type FileInputLoadingProps = PropsWithNullishFile;

export const FileUploadLoading = memo(({ file }: FileInputLoadingProps) => {
  if (!file) return null;

  const fileSizeInMb =
    (file.size / (1024 * 1024)).toFixed(2).toString() + " MB";

  return (
    <div className={styles.attachmentFile}>
      <span className={styles.fileStatus}>
        <Loading className={styles.loading} />
        МойСклад обрабатывает запрос для файла
      </span>
      <span className={styles.fileName}>{file.name}</span>
      <span className={styles.fileSize}>{fileSizeInMb}</span>
    </div>
  );
});
