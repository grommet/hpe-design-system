import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, CheckBoxGroup, List, Tab, Tabs, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

export const ColumnSettings = ({
  columns,
  visibleColumns,
  setVisibleColumns,
  open,
  ...rest
}) => {
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [search, setSearch] = useState('');

  const filterColumns = (array, searchValue = search) => {
    let filterResults = array;

    if (searchValue) {
      filterResults = array.filter(o =>
        Object.keys(o).some(
          k =>
            typeof o[k] === 'string' &&
            o[k].toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
    return filterResults;
  };

  const getColumn = property =>
    columns.find(column => column.property === property);

  return (
    <Box pad="small" elevation="medium">
      <Tabs {...rest}>
        <Tab title="Select Columns">
          <Box pad={{ top: 'xsmall' }}>
            <TextInput
              type="search"
              icon={<Search id="search-cols-icon" />}
              placeholder="Search columns"
              value={search}
              onChange={event => {
                setSearch(event.target.value);
                const nextColumns = filterColumns(columns, event.target.value);
                setFilteredColumns(nextColumns);
              }}
              // once the Drop opens and TextInput renders, focus it
              autoFocus={open}
            />
            <CheckBoxGroup
              options={filteredColumns}
              valueKey="property"
              labelKey="header"
              value={visibleColumns.map(column => column.property)}
              onChange={({ value }) => setVisibleColumns(value.map(getColumn))}
            />
          </Box>
        </Tab>
        <Tab title="Order Columns">
          <List
            data={visibleColumns}
            onOrder={orderedData => setVisibleColumns(orderedData)}
            pad="none"
            primaryKey="header"
          />
        </Tab>
      </Tabs>
    </Box>
  );
};

const ColumnType = PropTypes.shape({
  header: PropTypes.string,
  property: PropTypes.string,
});

ColumnSettings.propTypes = {
  columns: PropTypes.arrayOf(ColumnType).isRequired,
  visibleColumns: PropTypes.arrayOf(ColumnType).isRequired,
  setVisibleColumns: PropTypes.func,
  open: PropTypes.bool,
};
