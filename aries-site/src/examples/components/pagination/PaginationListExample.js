import React from 'react';
import { Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const PaginationListExample = () => (
  <Box overflow="auto" pad="xsmall">
    <List
      data={data}
      action={(item, index) => (
        <Menu
          key={index}
          icon={<More />}
          hoverIndicator
          items={[{ label: 'See Details' }, { label: 'Delete' }]}
        />
      )}
      step={7}
      show={{ page: 7 }}
      paginate={{
        border: 'top',
        direction: 'row',
        fill: 'horizontal',
        justify: 'end',
        pad: { top: 'xsmall' },
      }}
    />
  </Box>
);
