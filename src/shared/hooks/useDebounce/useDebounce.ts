import { useCallback, useRef } from "react";

export function useDebounce(
  callback: (...args: any) => unknown,
  delay: number
) {
  const timer = useRef<any>(null);
  const debounceCallback = useCallback(
    (...args: any) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCallback;
}
