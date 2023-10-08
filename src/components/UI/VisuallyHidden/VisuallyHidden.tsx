import React, { ElementType, PropsWithChildren } from "react";

type VisuallyHiddenProps = PropsWithChildren & {
  as?: ElementType;
};

const DEFAULT_COMPONENT = "div";

export const VisuallyHidden = ({
  children,
  as,
  ...restProps
}: VisuallyHiddenProps): JSX.Element => {
  const Component = as ?? DEFAULT_COMPONENT;

  return (
    <Component className="visually-hidden" {...restProps}>
      {children}
    </Component>
  );
};
