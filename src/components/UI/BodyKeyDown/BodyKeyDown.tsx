import React, { PropsWithChildren, useEffect } from "react";

import type { ValuesOf } from "shared/types/helpers";
import { KeyCode } from "@/shared/const";

type BodyKeydownProps = PropsWithChildren & {
  callback?: () => void;
  code?: ValuesOf<typeof KeyCode>;
  disabled?: boolean;
};

export const BodyKeyDown = ({
  children,
  disabled,
  code = KeyCode.Escape,
  callback,
}: BodyKeydownProps): JSX.Element => {
  useEffect(() => {
    if (disabled || !callback) {
      return () => undefined;
    }

    const onBodyKeydown = (evt: KeyboardEvent) => {
      if (evt.code === code) {
        callback();
      }
    };

    document.body.addEventListener("keydown", onBodyKeydown);

    return () => {
      document.body.removeEventListener("keydown", onBodyKeydown);
    };
  }, [disabled, callback, code]);

  return <>{children}</>;
};
