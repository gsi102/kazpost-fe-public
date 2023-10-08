import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import {
  useReactTable,
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  RowData,
} from "@tanstack/react-table";

import { getDateFormated } from "@/shared/helpers/getDateFormated";
import { parseIdFromHref } from "@/shared/helpers/parseIdFromHref";

import { TracksHeader } from "@/components/SettingsPage/components/TracksHeader";
import { TracksOrders } from "@/components/SettingsPage/components//TracksOrders";
import { Input, Preloader, RequestStatus } from "@/components/UI";

import {
  SettingsPageDispatch,
  SettingsPageState,
} from "@/components/SettingsPage/reducer";
import { TracksController } from "@/api/controllers";

import { Nullable } from "@/shared/types/helpers";

import { Customerorder, EntityAttribute } from "@/shared/types";

import { PropsDispatchAndState } from "@/shared/types/component";

import styles from "./Tracks.module.scss";
import { KeyCode } from "@/shared/const";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    selectedAttribute: EntityAttribute | null;
    updateData: (documentId: string, value: string) => Promise<void>;
  }
}

const columnHelper = createColumnHelper<Customerorder>();
const defaultColumn: Partial<ColumnDef<Customerorder>> = {
  cell: ({ getValue, row: { original }, table }) => {
    const selectedAttributeId = table.options.meta?.selectedAttribute?.id;
    if (!selectedAttributeId) {
      return <span className="caption">Не выбрано доп. поле</span>;
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>("");
    const [initialValue, setInitialValue] = useState<string>("");
    const [isTrackPreloader, setIsTrackPreloader] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<Nullable<boolean>>(null);

    const attributes = getValue() as EntityAttribute[] | undefined;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value.toUpperCase());
    };

    useEffect(() => {
      const foundAttribute = attributes?.find(
        (el: EntityAttribute) => el.id === selectedAttributeId
      );
      if (foundAttribute?.value) {
        const trackLink = foundAttribute.value.toString();
        const initialValue = parseIdFromHref(trackLink).toUpperCase();
        setInitialValue(initialValue);
      } else setInitialValue("");
    }, [attributes]);

    const documentId = original.id;

    const onBlur = async (): Promise<void> => {
      const attribute = original.attributes?.find(
        (attribute) => attribute.id === selectedAttributeId
      );
      const currentValue = parseIdFromHref(attribute?.value as string);
      if (currentValue.toUpperCase() === value.toUpperCase()) return;
      setIsTrackPreloader(true);
      await table.options.meta
        ?.updateData(documentId, value)
        .then(() => setIsSuccess(true))
        .catch(() => setIsSuccess(false))
        .finally(() => {
          setIsTrackPreloader(false);
          setTimeout(() => setIsSuccess(null), 1500);
        });
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.code !== KeyCode.Enter && e.code !== KeyCode.NumpadEnter) return;
      inputRef.current?.blur();
    };

    return (
      <div className={styles.inputContainer}>
        <Input
          ref={inputRef}
          className={styles.Input}
          value={initialValue}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          isAsync={true}
        />
        <Preloader isPreloader={isTrackPreloader} />
        <RequestStatus
          isSuccess={isSuccess}
          className={styles.imgRequestStatus}
        />
      </div>
    );
  },
};
const columns: Array<ColumnDef<Customerorder, any>> = [
  columnHelper.accessor("name", {
    header: "№",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("created", {
    header: "создан",
    cell: (info) => {
      const date = info.getValue();
      return getDateFormated(date);
    },
    size: 100,
  }),
  columnHelper.accessor("agent", {
    header: "контрагент",
    cell: (info) => info.getValue().name,
  }),
  columnHelper.accessor("shipmentAddress", {
    header: "адрес",
    cell: (info) => <div style={{ textAlign: "left" }}>{info.getValue()}</div>,
  }),
  columnHelper.accessor("attributes", {
    header: "трек-номер",
    // cell: defaultColumn
  }),
];

export const Tracks: FC<
  PropsDispatchAndState<SettingsPageDispatch, SettingsPageState>
> = (props) => {
  const { dispatch, state } = props;
  if (state.showOnRight !== "tracks") return null;
  const {
    accountId,
    selectedAttribute,
    customerorders,
    showCustomerorders,
    isAllLoaded,
  } = state;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const table = useReactTable<Customerorder>({
    data: showCustomerorders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    defaultColumn,
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    meta: {
      selectedAttribute,
      updateData: async (documentId, value) => {
        return TracksController.updateTrack({
          dispatch,
          state,
          documentId,
          value,
        });
      },
    },
  });

  const loadMoreOrders = useCallback(async (): Promise<void> => {
    if (showCustomerorders?.length !== customerorders?.length) return;
    return TracksController.loadMoreOrders({
      dispatch,
      accountId,
      customerorders,
      isAllLoaded,
    });
  }, [accountId, customerorders, showCustomerorders, isAllLoaded]);

  return (
    <div>
      <TracksHeader
        dispatch={dispatch}
        state={state}
        accountId={accountId}
        customerorders={customerorders}
        table={table}
        setIsLoading={setIsLoading}
      />
      <Preloader isPreloader={isLoading} className={styles.Preloader}>
        <TracksOrders
          table={table}
          isItems={!!showCustomerorders}
          loadMoreOrders={loadMoreOrders}
        />
      </Preloader>
    </div>
  );
};
