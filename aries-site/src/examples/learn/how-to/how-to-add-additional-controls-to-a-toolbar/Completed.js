/* eslint-disable grommet/datatable-aria-describedby */
import { useEffect, useState } from 'react';
import {
  Box,
  Data,
  DataTable,
  DataSearch,
  DataSort,
  DataFilters,
  DataTableColumns,
  Toolbar,
  DataSummary,
} from 'grommet';
import { columns, fetchPayloads, options } from './utils';
import { Pagination } from './components/Pagination';

const ResultsWrapper = ({ ...rest }) => (
  // style needed to ensure pagination controls stay aligned with datatable
  (<Box align="start">
    <Box style={{ display: 'inline-block' }} {...rest} />
  </Box>)
);

export const Completed = () => {
  const [response, setResponse] = useState();
  const [view, setView] = useState();
  const data = response?.docs || [];
  const numberItems = response?.totalDocs || 0;

  useEffect(() => {
    const fetchData = fetchPayloads;
    fetchData(view?.page, view)
      .then(d => setResponse(d))
      .catch(error => console.log(`Unable to fetch data: ${error}`));
  }, [view]);

  return (
    <Box align="start" pad="medium">
      <Box>
        <Data
          data={data}
          properties={{
            type: {
              label: 'Type',
              options: [
                'Dragon 1.0',
                'Dragon 1.1',
                'Dragon Boilerplate',
                'Satellite',
              ],
            },
            mass_lbs: {
              label: 'Mass',
              range: { min: 0, max: 1400 },
            },
          }}
          view={view}
          onView={setView}
          total={numberItems}
        >
          <Toolbar gap="medium">
            <Toolbar>
              <DataSearch />
              <DataSort drop />
              <DataFilters layer />
            </Toolbar>
            <DataTableColumns options={options} drop />
          </Toolbar>
          <DataSummary />
          <ResultsWrapper>
            <DataTable alignSelf="start" columns={columns} />
            <Pagination />
          </ResultsWrapper>
        </Data>
      </Box>
    </Box>
  );
};
