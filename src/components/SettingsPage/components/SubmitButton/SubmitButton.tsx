import React, { FC } from "react";

import { Button, Preloader } from "@/components/UI";

import { Nullable } from "@/shared/types/helpers";

import imgSuccess from "@/shared/assets/img/checkbox.png";

import styles from "./SubmitButton.module.scss";

type SubmitButtonProps = {
  onSubmit: () => void;
  isPreloader: boolean;
  saveNotification: Nullable<boolean>;
};

const TextError =
  "Что-то пошло не так. Пожалуйста, обновите страницу и попробуйте снова";
const TextSuccess = "Сохранено";
const ImgSuccessElement = (
  <img src={imgSuccess} alt="checkbox.png" width="16px" height="16px" />
);

const preloaderStyles = { width: "32px", margin: "0 16px" };

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { onSubmit, isPreloader, saveNotification } = props;
  const isNotification = saveNotification !== null;
  const notification =
    isNotification && saveNotification
      ? styles.savedSuccess
      : styles.savedError;
  const notificationText =
    isNotification && saveNotification ? TextSuccess : TextError;

  return (
    <div className={styles.SubmitButton}>
      <Button className={styles.button} onClick={onSubmit}>
        Сохранить
      </Button>
      <Preloader isPreloader={isPreloader} style={preloaderStyles} />
      {isNotification && (
        <div className={notification}>
          <strong>{notificationText}</strong>
          {saveNotification && ImgSuccessElement}
        </div>
      )}
    </div>
  );
};
