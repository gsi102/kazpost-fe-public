import React, {
  forwardRef,
  memo,
  ChangeEvent,
  useState,
  useEffect,
  InputHTMLAttributes,
  useCallback,
} from "react";

import { ExtendableProps } from "@/shared/types/component";
import { useForwardedRef } from "@/shared/hooks/useForwardedRef";

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;
type AppInputProps = {
  placeHolder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isAsync?: boolean;
};
type InputProps = ExtendableProps<NativeInputProps, AppInputProps>;

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const inputRef = useForwardedRef(ref);

    const type = props.type || "text";
    const value = props.value || "";
    const [val, setVal] = useState<string | number>(value);

    useEffect(() => {
      setVal(value);
    }, [value]);

    const onChangeLocal = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setVal(text);
        props.onChange?.(e);
        return;
      },
      [props.onChange]
    );

    return (
      <input
        {...props}
        ref={inputRef}
        className={props.className}
        type={type}
        value={val}
        onChange={onChangeLocal}
      />
    );
  })
);
