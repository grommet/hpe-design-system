import React from 'react';
import { DataTable, Pagination, SortType, View } from 'grommet';
import { tableColumns } from './table-columns';

export const TableView = (
  { onSort, select, setSelect, total, view }:
    {
      onSort: (sort: SortType) => void,
      select: string[],
      setSelect: React.Dispatch<React.SetStateAction<string[]>>,
      total: number,
      view: View
    }) => {

  return (
    <>
      <DataTable
        columns={tableColumns}
        select={select}
        onSelect={setSelect}
        sortable
        onSort={onSort}
      />
      <Pagination
        summary
        stepOptions
        step={view.step}
        border="top"
        pad={{ left: 'small', vertical: 'xsmall' }}
        numberItems={total}
      />
    </>
  );
}

