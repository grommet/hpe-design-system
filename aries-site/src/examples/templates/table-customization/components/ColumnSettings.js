import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, CheckBoxGroup, List, Tab, Tabs, TextInput } from 'grommet';
import { Search } from 'grommet-icons';

export const ColumnSettings = ({
  columns,
  setColumns,
  visible,
  setVisible,
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
                const nextColumns = filterColumns(
                  columns,
                  event.target.value,
                );
                setFilteredColumns(nextColumns);
              }}
            />
            <CheckBoxGroup
              options={filteredColumns}
              valueKey="property"
              labelKey="header"
              value={visible}
              onChange={({ value }) => setVisible(value)}
            />
          </Box>
        </Tab>
        <Tab title="Order Columns">
          <List
            data={columns}
            onOrder={orderedData => setColumns(orderedData)}
            pad="none"
            primaryKey="header"
          />
        </Tab>
      </Tabs>
    </Box>
  );
};

ColumnSettings.propTypes = {
  columns: PropTypes.array.isRequired,
  setColumns: PropTypes.func.isRequired,
  visible: PropTypes.arrayOf(PropTypes.string).isRequired,
  setVisible: PropTypes.func,
};
