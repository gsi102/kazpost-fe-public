import { quickSort } from "@/shared/helpers/quickSort";

import { AccountsColumn } from "@/shared/types";

const AdviceSender =
  'Укажите данные отправителя, которые необходимо использовать в адресных ярлыках. Данные НЕ форматируются - в адресный ярлык вставятся точные значения из этой формы. Пример адресного ярлыка на вкладке "Описаниe"';

const fromDictionary = {
  [AccountsColumn.PersonFrom]: { name: "Отправитель", maxLength: 255 },
  [AccountsColumn.PhoneFrom]: { name: "Телефон", maxLength: 20 },
  [AccountsColumn.ZipFrom]: { name: "Индекс", maxLength: 10 },
  [AccountsColumn.AddressFrom]: { name: "Адрес", maxLength: 255 },
};

const fieldNames = Object.values(fromDictionary).map((el) => el.name);
const compareFunc = (a: string, b: string) => a.length - b.length < 0;
const maxFieldNameLength = quickSort<string>(fieldNames, compareFunc)[0].length;
const fieldNameStyle = {
  display: "inline-block",
  width: maxFieldNameLength + "ch",
};

export { AdviceSender, fromDictionary, fieldNameStyle };
