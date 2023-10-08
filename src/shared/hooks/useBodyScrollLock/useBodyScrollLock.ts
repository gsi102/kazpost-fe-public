import { useEffect } from 'react';

type UseBodyScrollLockConfig = {
  disabled?: boolean;
};

const BLOCK_COUNT = '--block-count';
const SCROLL_COMPENSATOR = '--scroll-compensator';

const blockScroll = () => {
  let currentBlockCount =
    Number(document.documentElement.style.getPropertyValue(BLOCK_COUNT)) || 0;

  if (!currentBlockCount) {
    const clientWidthBeforeHidden = document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    const clientWidthAfterHidden = document.documentElement.clientWidth;

    const scrollWidth = clientWidthAfterHidden - clientWidthBeforeHidden;

    document.documentElement.style.setProperty(
      SCROLL_COMPENSATOR,
      `${scrollWidth}px`
    );
  }

  currentBlockCount += 1;
  document.documentElement.style.setProperty(
    BLOCK_COUNT,
    String(currentBlockCount)
  );
};

const unblockScroll = () => {
  let currentBlockCount =
    Number(document.documentElement.style.getPropertyValue(BLOCK_COUNT)) || 1;
  currentBlockCount -= 1;
  document.documentElement.style.setProperty(
    BLOCK_COUNT,
    String(currentBlockCount)
  );

  if (!currentBlockCount) {
    document.body.style.overflow = '';
    document.documentElement.style.setProperty(SCROLL_COMPENSATOR, '0');
  }
};

export const useBodyScrollLock = (
  config: UseBodyScrollLockConfig = {}
): void => {
  const { disabled } = config;

  useEffect(() => {
    if (!disabled) {
      blockScroll();

      return () => {
        unblockScroll();
      };
    }

    return () => undefined;
  }, [disabled]);
};
