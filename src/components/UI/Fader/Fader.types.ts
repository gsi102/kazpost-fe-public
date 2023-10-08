import type { HTMLAttributes } from "react";
import { ExtendableProps } from "shared/types/component";

type AppFaderProps = {
  timeout?: number;
  in: boolean;
  sliding?: boolean;
  scaling?: boolean;
  keepMounted?: boolean;
};

type NativeFaderProps = HTMLAttributes<HTMLDivElement>;

export type FaderProps = ExtendableProps<NativeFaderProps, AppFaderProps>;
