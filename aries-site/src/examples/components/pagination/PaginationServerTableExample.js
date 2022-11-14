import React, { useEffect, useState } from 'react';
import { Box, DataTable, Heading, Pagination, Text, Meter, Tip } from 'grommet';
import { StatusCritical } from 'grommet-icons';

const columns = [
  {
    property: 'name',
    header: 'Name',
    size: 'small',
    primary: true,
  },
  {
    property: 'rocket',
    header: 'Rocket',
    size: 'small',
    render: datum => <Text key={datum.rocket.name}>{datum.rocket.name}</Text>,
    align: 'end',
  },
  {
    property: 'success',
    header: 'Success',
    size: 'xsmall',
    align: 'end',
    sortable: false,
    render: datum => {
      if (datum.success === false) {
        const content = (
          <Box width={{ max: 'medium' }}>
            {datum.failures?.map(({ reason }) => (
              <Text key={reason}>{reason}</Text>
            ))}
          </Box>
        );
        return (
          <Tip
            plain
            content={content}
            dropProps={{
              round: 'medium',
              pad: 'small',
              background: 'background-back',
            }}
          >
            <Box>
              <StatusCritical color="red" />
            </Box>
          </Tip>
        );
      }
      return undefined;
    },
  },
];

export const PaginationServerTableExample = () => {
  const [sort, setSort] = useState({ property: 'name', direction: 'asc' });
  const [data, setData] = useState([]);
  const [numberItems, setNumberItems] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const pageResultStart = (page - 1) * limit + 1;
  const pageResultEnd = Math.min(page * limit, numberItems);

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        options: {
          populate: [
            {
              path: 'rocket',
              select: { name: 1 },
            },
          ],
          sort: {
            [sort.property || 'name']: sort.direction || 'asc',
          },
          select: ['name', 'success', 'failures'],
          limit,
          page,
        },
      };
      fetch('https://api.spacexdata.com/v4/launches/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      })
        .then(response => response.json())
        .then(d => {
          setPage(d.page);
          setNumberItems(d.totalDocs);
          setData(d.docs || []);
        })
        .catch(error => console.error('Unable to get data:', error));
    };
    fetchData();
  }, [sort, page]);

  return (
    <Box pad="small">
      <Heading id="server-side-pagination-heading" level={3}>
        Launches
      </Heading>

      <Box>
        <DataTable
          aria-describedby="server-side-pagination-heading"
          columns={columns}
          data={data}
          sort={{ ...sort, external: true }}
          replace
          step={limit}
          onSort={opts => setSort(opts)}
          fill
          gap="small"
        />

        {numberItems > limit && (
          <Box
            direction="row-responsive"
            align="center"
            border="top"
            justify="end"
            pad={{ vertical: 'xsmall' }}
            fill
          >
            <Text>
              Showing {pageResultStart}-{pageResultEnd} of {numberItems}
            </Text>
            <Pagination
              step={limit}
              numberItems={numberItems}
              page={page}
              onChange={opts => setPage(opts.page)}
              direction="row"
              flex={false}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
