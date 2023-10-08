import React, { FC, ImgHTMLAttributes } from "react";

import { Nullable } from "@/shared/types/helpers";

import { ExtendableProps } from "@/shared/types/component";

import imgSuccess from "@/shared/assets/img/checkbox.png";
import imgError from "@/shared/assets/img/imgError.png";

type NativeImgProps = ImgHTMLAttributes<HTMLImageElement>;
type AppRequestStatusProps = {
  isSuccess: Nullable<boolean>;
  className?: string;
};
type RequestStatusProps = ExtendableProps<
  NativeImgProps,
  AppRequestStatusProps
>;

export const RequestStatus: FC<RequestStatusProps> = (props) => {
  const { isSuccess, className } = props;
  if (isSuccess === null) return null;

  const appendImg = isSuccess ? imgSuccess : imgError;

  return (
    <img
      {...props}
      className={className}
      src={appendImg}
      alt="requestStatus.png"
    />
  );
};
