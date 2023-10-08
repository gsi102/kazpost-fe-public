import React, { FC } from "react";

import { ShowOnRight } from "@/components/SettingsPage/reducer";

import InvoiceSample from "@/shared/assets/img/invoiceSample.webp";

import styles from "./Description.module.scss";

type Description = {
  type: ShowOnRight;
};

const style = { marginBottom: "20px" };

export const Description: FC<Description> = ({ type }) => {
  if (type !== "description") return null;

  return (
    <div>
      <p style={style}>
        Приложение Накладные для Казпочты позволяет сформировать адресный ярлык
        на основании данных заказа нажатием одной кнопки. Данные получателя
        (контрагент, его адрес и телефон) берутся из Заказа покупателя. Адрес
        отправителя указывается на вкладке&nbsp;
        <strong>Настройки</strong>
      </p>
      <p style={style}>
        Дополнительно приложение позволяет задать трек номера Казпочты к заказу.
        Готовая ссылка на сервис отслеживания добавится в выбранное вами
        пользовательское поле (см. вкладку <strong>Настройки</strong>).
      </p>
      <div className={styles.imgBlock}>
        <img src={InvoiceSample} width="720px" alt="invoiceSample.webp" />
        <span className="caption">
          Пример заполненного ярлыка в результате работы приложения
        </span>
      </div>
    </div>
  );
};
