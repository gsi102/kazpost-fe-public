import { useState } from 'react';

import { ModalProps } from './Modal';

export type UseModalReturn = {
  setOpen: () => void;
  setClose: () => void;
  toggle: () => void;
  isOpened: boolean;
  getProps: () => Omit<ModalProps, 'children'>;
};

export const useModal = (): UseModalReturn => {
  const [isOpened, setIsOpened] = useState(false);

  const setOpen = () => setIsOpened(true);

  const setClose = () => setIsOpened(false);

  const toggle = () => setIsOpened((prevIsOpened) => !prevIsOpened);

  const getProps = (): ModalProps => ({
    isOpened,
    close: setClose
  });

  return { setOpen, setClose, toggle, isOpened, getProps };
};
