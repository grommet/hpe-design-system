import {
  Box,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Pagination,
  Toolbar,
} from 'grommet';

interface Item {
  id: string;
  name: string;
  // add your fields here
}

export function ItemsTable({ items }: { items: Item[] }) {
  return (
    <Box background="background-front" round="medium" overflow="hidden" pad="medium">
      <Data
        data={items}
        properties={{
          // declare filterable fields:
          // fieldName: { label: 'Field Label' },
        }}
      >
        <Toolbar>
          <DataSearch placeholder="Search..." />
          <DataFilters layer>
            {/* <DataFilter property="fieldName" /> */}
          </DataFilters>
        </Toolbar>
        <DataSummary />
        <DataTable
          columns={[
            { property: 'name', header: 'Name', primary: true },
            // add more columns here
          ]}
          sortable
          pin
        />
        <Box pad={{ top: 'xsmall' }} border={{ side: 'top' }}>
          <Pagination step={10} summary stepOptions={[10, 20]} />
        </Box>
      </Data>
    </Box>
  );
}