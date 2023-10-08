import React, { HTMLAttributes, useState, useCallback } from "react";
import classNames from "classnames";

import {
  FileUploadFormSuccess,
  SuccessModalData,
} from "@/components/SettingsPage/components/FileUploadFormSuccess";

import { FileUpload, FileUploadState, Button } from "@/components/UI";

import { TracksController } from "@/api/controllers";
import { SettingsPageState } from "@/components/SettingsPage/reducer";

import { Nullable, ValuesOf } from "@/shared/types/helpers";

import styles from "./FileUploadForm.module.scss";

type ExternalProps = {
  state: SettingsPageState;
  closeModal: () => void;
};
type FileUploadFormProps = HTMLAttributes<HTMLFormElement> & ExternalProps;

export const FileUploadForm = ({
  className,
  state,
  closeModal,
  ...restProps
}: FileUploadFormProps) => {
  const accountId = state.accountId;
  const attributeId = state.selectedAttribute?.id;
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [successModalData, setSuccessModalData] =
    useState<Nullable<SuccessModalData>>(null);

  const [uploadedFile, setUploadedFile] = useState<Nullable<File>>(null);
  const [uploadedFileState, setUploadedFileState] = useState<
    ValuesOf<typeof FileUploadState>
  >(FileUploadState.Initial);

  const onFileUpload = useCallback(async (file: Nullable<File>) => {
    setUploadedFileState(FileUploadState.Initial);
    setUploadedFile(file);
  }, []);

  const onSendForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isFormSubmitting) return;
      setIsFormSubmitting(true);
      setUploadedFileState(FileUploadState.Loading);

      await TracksController.sendTracksFile(
        accountId,
        attributeId,
        uploadedFile
      )
        .then((res) => {
          setSuccessModalData({ ...res });
          setUploadedFileState(FileUploadState.Success);
          setIsSuccessModal(true);
        })
        .catch((err) => {
          setUploadedFileState(FileUploadState.Error);
        })
        .finally(() => {
          setIsFormSubmitting(false);
        });
    },
    [accountId, attributeId, uploadedFile, isFormSubmitting]
  );

  if (isSuccessModal)
    return (
      <FileUploadFormSuccess
        onConfirm={closeModal}
        successModalData={successModalData}
      />
    );

  return (
    <form
      onSubmit={onSendForm}
      className={classNames(className, styles.FileUploadForm)}
      {...restProps}
    >
      <FileUpload
        id="attachments"
        name="tracksFile"
        onChange={onFileUpload}
        state={uploadedFileState}
        value={uploadedFile}
        className={styles.textAreaColumn}
        accept={".xls, .xlsx"}
      />

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={!uploadedFile}
      >
        Отправить
      </Button>
    </form>
  );
};
