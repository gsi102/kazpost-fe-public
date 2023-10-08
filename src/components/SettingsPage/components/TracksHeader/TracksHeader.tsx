import React, {
  FC,
  useCallback,
  useState,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Table } from "@tanstack/react-table";

import {
  AdvicedClause,
  Button,
  Input,
  Modal,
  Preloader,
  RequestStatus,
  useModal,
} from "@/components/UI";

import { FileUploadForm } from "@/components/SettingsPage/components/FileUploadForm";

import { Nullable } from "@/shared/types/helpers";
import { TracksController } from "@/api/controllers";
import {
  SettingsPageDispatch,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";

import { Customerorder } from "@/shared/types";

import styles from "./TracksHeader.module.scss";
import { KeyCode } from "@/shared/const";

type TracksHeaderProps = {
  dispatch: SettingsPageDispatch;
  state: SettingsPageState;
  accountId: Nullable<string>;
  customerorders: Nullable<Customerorder[]>;
  table: Table<Customerorder>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const adviceUpload =
  "Поддерживается только формат xls/xlsx. Первая строка не учитывается. Лимит - 1000. Для точного распознавания трек-номеров скачайте наш шаблон, заполните его и загрузите сюда.";

export const TracksHeader: FC<TracksHeaderProps> = (props) => {
  const { dispatch, state, accountId, customerorders, table, setIsLoading } =
    props;

  const requestFormModal = useModal();

  const [isPreloader, setIsPreloader] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<Nullable<boolean>>(null);

  const onSearch = useCallback(async () => {
    setIsLoading(true);
    return TracksController.onSearch(
      dispatch,
      accountId,
      customerorders,
      searchValue
    ).finally(() => {
      setIsLoading(false);
      table.resetPageIndex(true);
    });
  }, [searchValue, accountId, customerorders, table]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === KeyCode.Enter || e.code === KeyCode.NumpadEnter) {
        onSearch();
      } else return;
    },
    [onSearch]
  );

  const downloadTemplate = useCallback(async () => {
    setIsPreloader(true);
    /* обработка ошибок в контроллере */
    const blob = await TracksController.getTracksTemplate()
      .then((file) => {
        setIsSuccess(true);
        return file;
      })
      .catch(() => setIsSuccess(false))
      .finally(() => {
        setIsPreloader(false);
        setTimeout(() => setIsSuccess(null), 1500);
      });
    if (!blob) return; // уведомление об ошибке

    const fileURL = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = fileURL;
    a.download = "kazpostTracks.xls";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(fileURL);
    a.remove();

    return;
  }, []);

  return (
    <div className={styles.TracksHeader}>
      <Input
        className={styles.input}
        placeholder={"Введите номер заказа для поиска"}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={onKeyDown}
        value={searchValue}
      />
      <Button className={styles.button} onClick={onSearch}>
        Найти
      </Button>
      <Button className={styles.button} onClick={downloadTemplate}>
        Скачать шаблон
      </Button>
      <AdvicedClause advice={adviceUpload}>
        <Button
          onClick={requestFormModal.setOpen}
          className={styles.uploadButton}
        >
          Загрузить файлом
        </Button>
      </AdvicedClause>
      <Modal preventOverlayClose {...requestFormModal.getProps()}>
        <FileUploadForm state={state} closeModal={requestFormModal.setClose} />
      </Modal>
      <Preloader isPreloader={isPreloader} className={styles.Preloader} />
      <RequestStatus isSuccess={isSuccess} className={styles.RequestStatus} />
    </div>
  );
};
