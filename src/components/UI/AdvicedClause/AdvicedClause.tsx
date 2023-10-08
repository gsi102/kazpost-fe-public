import React, { FC, memo } from "react";
import classNames from "classnames";

import { isObjectProperty } from "@/shared/helpers/isObjectProperty";

import questionMark from "@/shared/assets/img/questionMark.png";

import styles from "./AdvicedClause.module.scss";

type AdviceImg = {
  src: string;
};

type AdvicedClauseProps = {
  children: any;
  advice: string | AdviceImg | JSX.Element;
  className?: string;
};

function getChild(advice: string | AdviceImg | JSX.Element): JSX.Element {
  if (typeof advice === "string") {
    return <span>{advice}</span>;
  }

  if (
    typeof advice === "object" &&
    isObjectProperty(advice as AdviceImg, "src")
  ) {
    const adviceImg = advice as AdviceImg;
    return (
      <img src={adviceImg.src} alt="descriptionImg" className={styles.img} />
    );
  }

  return <>{advice}</>;
}

export const AdvicedClause: FC<AdvicedClauseProps> = memo((props) => {
  const { advice, children, className } = props;
  const appendChildren = getChild(children);
  const appendAdvice = getChild(advice);

  return (
    <div className={classNames(styles.clause, className)}>
      <div className={styles.child}>{appendChildren}</div>
      <div className={styles.advice}>
        <img
          src={questionMark}
          alt="questionMark.png"
          width="15px"
          height="15px"
        />
        <div>{appendAdvice}</div>
      </div>
    </div>
  );
});
