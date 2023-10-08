import React, { FC, useCallback, useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";

import { Preloader } from "@/components/UI";

import { ItemsRequestLimit } from "@/shared/const";

import { Customerorder } from "@/shared/types";

import styles from "./TracksPagination.module.scss";

type TracksPaginationProps = {
  table: Table<Customerorder>;
  loadMoreOrders: () => Promise<void>;
};

const showOnPage = [25, ItemsRequestLimit / 2];

export const TracksPagination: FC<TracksPaginationProps> = (props) => {
  const { table, loadMoreOrders } = props;

  const [isPreloader, setIsPreloader] = useState<boolean>(false);

  const onPage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      let page = e.target.value ? Number(e.target.value) - 1 : 0;
      const lastPageIndex = table.getPageCount() - 1;

      if (page >= lastPageIndex) {
        table.setPageIndex(lastPageIndex);
        setIsPreloader(true);
        await loadMoreOrders().finally(() => {
          setIsPreloader(false);
        });
      } else table.setPageIndex(page);
    },
    [table, loadMoreOrders]
  );

  const goToNextPage = useCallback(async () => {
    const lastPage = table.getPageCount();
    const nextPage = table.getState().pagination.pageIndex + 2;
    table.nextPage();

    if (nextPage !== lastPage) return;
    setIsPreloader(true);
    await loadMoreOrders().finally(() => {
      setIsPreloader(false);
    });
  }, [table, loadMoreOrders]);

  const goToFinalPage = useCallback(async () => {
    table.setPageIndex(table.getPageCount() - 1);
    setIsPreloader(true);
    await loadMoreOrders().finally(() => {
      setIsPreloader(false);
    });
  }, [table, loadMoreOrders]);

  return (
    <div className={styles.TracksPagination}>
      <div className="flex gap-05">
        <button
          className={styles.button}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className={styles.button}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className={styles.button}
          onClick={goToNextPage}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className={styles.button}
          onClick={goToFinalPage}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
      <span className="flex items-center gap-05">
        <div>страница</div>
        <strong className={styles.pageCounter}>
          {table.getState().pagination.pageIndex + 1} из&nbsp;
          <Preloader isPreloader={isPreloader} className={styles.Preloader}>
            {table.getPageCount()}
          </Preloader>
        </strong>
      </span>
      <span>|</span>
      <span className="flex items-center gap-05">
        на страницу:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={onPage}
          className={styles.inputToPage}
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className={styles.select}
      >
        {showOnPage.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            показывать по {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
