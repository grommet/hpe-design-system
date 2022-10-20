import React, { useEffect, useState, useContext } from 'react';
import { Box, DataTable, Text, Tip, ResponsiveContext, Heading } from 'grommet';
import { StatusCritical } from 'grommet-icons';

const columns = [
  {
    property: 'name',
    header: 'Name',
    size: 'medium',
    primary: true,
  },
  {
    property: 'rocket',
    header: 'Rocket',
    size: 'small',
    render: datum => <Text key={datum.rocket.name}>{datum.rocket.name}</Text>,
  },
  {
    property: 'success',
    header: 'Success',
    size: 'xsmall',
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
  const size = useContext(ResponsiveContext);
  const stepSize = 10;
  const [sort, setSort] = useState({ property: 'name', direction: 'asc' });
  const [data, setData] = useState([]);

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
          pagination: false,
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
          setData(d.docs || []);
        })
        .catch(error => console.error('Unable to get data:', error));
    };

    fetchData();
  }, [sort]);

  return (
    <Box pad="small">
      <Heading
        id="server-side-pagination-heading"
        level={3}
        margin={{ bottom: 'small', top: 'none' }}
      >
        Launches
      </Heading>
      <Box align="center">
        <DataTable
          aria-describedby="server-side-pagination"
          columns={columns}
          data={data}
          sortable
          replace
          step={stepSize}
          onUpdate={opts => {
            if (opts.sort) setSort(opts.sort);
          }}
          paginate={{
            border: 'top',
            direction: 'row',
            fill: 'horizontal',
            flex: false,
            justify: !['xsmall', 'small'].includes(size) ? 'end' : 'center',
            pad: { top: 'xsmall' },
          }}
        />
      </Box>
    </Box>
  );
};
