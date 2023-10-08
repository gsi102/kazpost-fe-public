export type ExtendableProps<
  ExtendedProps = Record<string, unknown>,
  OverrideProps = Record<string, unknown>
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

export type PropsWithClassName = {
  className?: string;
};

export type PropsWithChildren = {
  children?: React.ReactNode;
};

export type PropsDispatchAndState<D, S> = {
  dispatch: D;
  state: S;
};
