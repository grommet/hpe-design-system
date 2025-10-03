import React, { useContext } from 'react';
import { List, Menu, ResponsiveContext } from 'grommet';
import { More } from 'grommet-icons';
import { ContentPane } from '../../../layouts';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const PaginationListExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <ContentPane overflow="auto">
      <List
        data={data}
        action={(item, index) => (
          <Menu
            key={index}
            icon={<More />}
            hoverIndicator
            items={[{ label: 'See details' }, { label: 'Delete' }]}
          />
        )}
        step={7}
        show={{ page: 7 }}
        paginate={{
          border: 'top',
          direction: 'row',
          fill: 'horizontal',
          justify: !['xsmall', 'small'].includes(size) ? 'end' : 'center',
          pad: { top: '3xsmall' },
        }}
      />
    </ContentPane>
  );
};
