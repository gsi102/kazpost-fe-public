import React, { useCallback } from "react";
import type { FC, PropsWithChildren, ReactNode } from "react";
import FocusLock from "react-focus-lock";

import XIcon from "@/shared/assets/icons/x.svg";

import { Fader, BodyKeyDown, Button } from "@/components/UI";

import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";

import styles from "./Modal.module.scss";

export type ModalProps = PropsWithChildren & {
  title?: ReactNode;
  runningLine?: ReactNode;
  isOpened: boolean;
  close?: () => void;
  preventOverlayClose?: boolean;
};

export const Modal: FC<ModalProps> = ({
  children,
  isOpened,
  close,
  title,
  preventOverlayClose,
}) => {
  const isClosed = !isOpened;

  useBodyScrollLock({ disabled: isClosed });

  const onOverlayClick = useCallback(() => {
    if (!preventOverlayClose) {
      close?.();
    }
  }, [preventOverlayClose, close]);

  return (
    <Fader in={isOpened} className={styles.Modal}>
      <BodyKeyDown callback={close} disabled={isClosed}>
        <div className={styles.overlay} onClick={onOverlayClick} />
        <FocusLock className={styles.content} disabled={isClosed}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}

          <Button type="button" onClick={close} className={styles.closeButton}>
            закрыть <XIcon />
          </Button>
        </FocusLock>
      </BodyKeyDown>
    </Fader>
  );
};
