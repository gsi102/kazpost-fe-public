import React, { FC, useState } from "react";

import { MailAddress, TgUrl } from "@/shared/const";

import { PropsWithClassName } from "@/shared/types/component";

import styles from "./TopBanner.module.scss";

const mailTo = "mailto:" + MailAddress;

export const TopBanner: FC<PropsWithClassName> = ({ className }) => {
  const [bannerStyle, setBannerStyle] = useState<string>(
    styles.freeConfiguration
  );
  const bannerCollapse = () => {
    setBannerStyle((prev) => prev + " " + styles.bannerCollapse);
  };

  const action = () => {
    window.open(TgUrl, "_blank");
  };
  return (
    <div className={className}>
      <div className={bannerStyle}>
        <span>
          Настроим <strong>бесплатно</strong> под ваши запросы. Просто&nbsp;
          <a onClick={action}>свяжитесь с нами в телеграм</a>
          &nbsp;или&nbsp;
          <a href={mailTo}>напишите на почту</a>
        </span>
        <div
          className={styles.closeFreeConfiguration}
          onClick={bannerCollapse}
        />
      </div>
      <div className={styles.logo}></div>
    </div>
  );
};
