import { ForwardedRef, RefObject, useImperativeHandle, useRef } from "react";
import { Nullable } from "@/shared/types/helpers";

export const useForwardedRef = <Element>(
  forwardedRef: ForwardedRef<Element>
): RefObject<Element> => {
  const ref = useRef<Element>(null);

  useImperativeHandle<Nullable<Element>, Nullable<Element>>(
    forwardedRef,
    () => ref.current
  );

  return ref;
};
