import React, { memo } from "react";

import FileIcon from "@/shared/assets/icons/fileIcon.svg";
import DeleteFile from "@/shared/assets/icons/deleteFile.svg";

import { PropsWithFile, PropsWithOptionalDeletion } from "./FileUpload.types";

import styles from "./FileUpload.module.scss";

type FileInputPreviewProps = PropsWithFile & PropsWithOptionalDeletion;

export const FileUploadPreview = memo(
  ({ file, onDelete }: FileInputPreviewProps) => {
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
