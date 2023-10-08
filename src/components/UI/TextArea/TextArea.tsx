import React, {
  forwardRef,
  memo,
  ChangeEvent,
  useState,
  useEffect,
  InputHTMLAttributes,
} from "react";

import { ExtendableProps } from "@/shared/types/component";
import { useForwardedRef } from "@/shared/hooks/useForwardedRef";

type NativeTextAreaProps = InputHTMLAttributes<HTMLTextAreaElement>;
type AppTextAreaProps = {
  placeHolder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
type TextAreaProps = ExtendableProps<NativeTextAreaProps, AppTextAreaProps>;

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
    const inputRef = useForwardedRef(ref);

    const value = props.value || "";
    const [val, setVal] = useState<string | number>(value);

    useEffect(() => {
      setVal(value);
    }, [value]);

    let onChange = props.onChange;
    if (!onChange) {
      onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setVal(text);
      };
    }

    return (
      <textarea
        {...props}
        ref={inputRef}
        className={props.className}
        value={val}
        onChange={onChange}
      />
    );
  })
);
