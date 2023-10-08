import React, { FC, memo } from "react";

import preloaderGif from "@/shared/assets/img/preloaderBlack.gif";

type PreloaderProps = {
  className?: string;
  style?: Record<string, string>;
  isPreloader?: boolean;
  children?: JSX.Element | number | string;
};

const imgStyles = { width: "100%", display: "block" };

export const Preloader: FC<PreloaderProps> = memo(
  ({ children, isPreloader, ...props }) => {
    if (isPreloader) {
      return (
        <div {...props}>
          <img src={preloaderGif} alt="preloader.gif" style={imgStyles} />
        </div>
      );
    }

    return children ? <>{children}</> : null;
  }
);
