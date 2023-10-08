import React, { memo } from "react";

import { Button } from "@/components/UI";

import FileIcon from "@/shared/assets/icons/fileIcon.svg";
import DeleteFile from "@/shared/assets/icons/deleteFile.svg";

import {
  PropsWithNullishFile,
  PropsWithOptionalDeletion,
} from "./FileUpload.types";

import styles from "./FileUpload.module.scss";

type FileInputSuccessProps = PropsWithNullishFile & PropsWithOptionalDeletion;

export const FileUploadSuccess = memo(
  ({ file, onDelete }: FileInputSuccessProps) => {
    if (!file) return null;
    const fileSizeInMb =
      (file.size / (1024 * 1024)).toFixed(2).toString() + " MB";

    return (
      <div className={styles.attachmentFile}>
        <span className={styles.fileStatus}>
          <FileIcon />
        </span>
        <span className={styles.fileName}>{file.name}</span>
        <span className={styles.fileSize}>{fileSizeInMb}</span>
        <button onClick={onDelete} className={styles.handleFile} type="button">
          <DeleteFile />
        </button>
      </div>
    );
  }
);
