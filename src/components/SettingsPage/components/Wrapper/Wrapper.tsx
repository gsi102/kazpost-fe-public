import React, { FC, ReactNode } from "react";

import { TopBanner } from "@/components/SettingsPage/components/TopBanner";

import styles from "./Wrapper.module.scss";

type WrapperProps = {
  children: ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className={styles.Wrapper}>
      <TopBanner className={styles.TopBanner} />
      {children}
    </div>
  );
};
