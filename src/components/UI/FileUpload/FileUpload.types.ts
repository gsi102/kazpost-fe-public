export type PropsWithFile = {
  file: File;
};

export type PropsWithNullishFile = {
  file?: File | null;
};

export type PropsWithOptionalDeletion = {
  onDelete?: () => void;
};
