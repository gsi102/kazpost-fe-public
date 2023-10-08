import React, { forwardRef, useMemo } from "react";
import { CSSTransition } from "react-transition-group";

import type { FaderProps } from "./Fader.types";

export const Fader = forwardRef<HTMLDivElement, FaderProps>(
  (
    {
      children,
      className,
      sliding = false,
      scaling = false,
      keepMounted = false,
      timeout = 300,
      in: isFadingIn,
      style,
      ...restProps
    },
    ref
  ) => {
    // const baseClassName = useMemo(() => {
    //   if (sliding) return "fader-sliding";
    //   return scaling ? "fader-scaling" : "fader";
    // }, [sliding, scaling]);

    const faderStyle = useMemo(
      () => ({
        ...style,
        "--fader-velocity": `${timeout}ms`,
      }),
      [style, timeout]
    );

    return (
      <CSSTransition
        in={isFadingIn}
        timeout={timeout}
        classNames="fader"
        mountOnEnter={!keepMounted}
        unmountOnExit={!keepMounted}
      >
        <div ref={ref} className={className} style={faderStyle} {...restProps}>
          {children}
        </div>
      </CSSTransition>
    );
  }
);
