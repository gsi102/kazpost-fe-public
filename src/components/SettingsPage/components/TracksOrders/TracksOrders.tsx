import React, { FC } from "react";

import { Table, flexRender } from "@tanstack/react-table";

import { TracksPagination } from "@/components/SettingsPage/components/TracksPagination";

import { Customerorder } from "@/shared/types";

import styles from "./TracksOrders.module.scss";

type TracksOrdersProps = {
  table: Table<Customerorder>;
  isItems: boolean;
  loadMoreOrders: () => Promise<void>;
};

export const TracksOrders: FC<TracksOrdersProps> = (props) => {
  let { table, isItems, loadMoreOrders } = props;
  if (!isItems) return null;

  return (
    <div>
      <table className={styles.TracksOrders}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const gottenSize = header.getSize();
                const width = gottenSize !== 150 ? gottenSize : undefined;

                return (
                  <th key={header.id} style={{ width }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => {
            const isOdd = rowIndex % 2 === 1;
            const rowStyle = isOdd ? styles.coloredRow : undefined;

            return (
              <tr key={row.id} className={rowStyle}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TracksPagination table={table} loadMoreOrders={loadMoreOrders} />
    </div>
  );
};
