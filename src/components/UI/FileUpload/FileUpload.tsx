import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  useCallback,
} from "react";
import classNames from "classnames";

import Paperclip from "@/shared/assets/icons/paperclip.svg";

import { ExtendableProps } from "@/shared/types/component";
import { Nullable, ValuesOf } from "@/shared/types/helpers";
import { useForwardedRef } from "@/shared/hooks/useForwardedRef";

import { FileUploadState } from "./FileUpload.constants";
import { FileUploadPreview } from "./FileUploadPreview";
import { FileUploadLoading } from "./FileUploadLoading";
import { FileUploadError } from "./FileUploadError";
import { FileUploadSuccess } from "./FileUploadSuccess";

import styles from "./FileUpload.module.scss";
import { Input } from "../Input";

type NativeFileInputProps = InputHTMLAttributes<HTMLInputElement>;

type AppFileInputProps = {
  value?: Nullable<File>;
  onChange?: (file: Nullable<File>) => void;
  state?: ValuesOf<typeof FileUploadState>;
};

type FileInputProps = ExtendableProps<NativeFileInputProps, AppFileInputProps>;

const resetInputFiles = (e: MouseEvent<HTMLInputElement>) => {
  (e.target as HTMLInputElement).value = "";
};

export const FileUpload = forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, className, value, onChange, state, ...restProps }, forwardedRef) => {
    const inputRef = useForwardedRef(forwardedRef);

    const onFileInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const file = files && files[0];
        return onChange?.(file);
      },
      [onChange]
    );

    const onDelete = useCallback(() => {
      onChange?.(null);
    }, [onChange]);

    const triggerFileUpload = useCallback(() => {
      inputRef.current?.click();
    }, []);

    switch (state) {
      case undefined:
      case FileUploadState.Initial: {
        const labelClassName = classNames(
          { ["visually-hidden"]: value },
          { [styles.attachment]: !value }
        );
        return (
          <div className={classNames(className, styles.FileInput)}>
            <label htmlFor={id} className={labelClassName}>
              <Input
                ref={inputRef}
                id={id}
                type="file"
                onChange={onFileInputChange}
                onClick={resetInputFiles}
                {...restProps}
              />
              {!value && <Paperclip />}
              {!value && "Выбрать файл"}
            </label>
            {value && <FileUploadPreview file={value} onDelete={onDelete} />}
          </div>
        );
      }
      case FileUploadState.Loading:
        return <FileUploadLoading file={value} />;
      case FileUploadState.Success:
        return (
          <div className={classNames(className, styles.FileInput)}>
            <label htmlFor={id} className="visually-hidden">
              <Input
                ref={inputRef}
                id={id}
                type="file"
                onChange={onFileInputChange}
                onClick={resetInputFiles}
                {...restProps}
              />
            </label>
            <FileUploadSuccess file={value} onDelete={onDelete} />;
          </div>
        );
      case FileUploadState.Error:
        return (
          <div className={classNames(className, styles.FileInput)}>
            <label htmlFor={id} className="visually-hidden">
              <Input
                ref={inputRef}
                id={id}
                type="file"
                onChange={onFileInputChange}
                onClick={resetInputFiles}
                {...restProps}
              />
            </label>
            <FileUploadError onDelete={triggerFileUpload} />
          </div>
        );

      default:
        return null;
    }
  }
);
