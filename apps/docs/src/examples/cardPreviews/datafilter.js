import React from 'react';
import { Data, Toolbar, DataFilter } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataFilterPreview = () => {
  const ref = useInert();

  return (
    <Data
      ref={ref}
      data={[
        {
          location: 'Fort Collins',
        },
        {
          location: 'Boise',
        },
        {
          location: 'Palo Alto',
        },
        {
          location: 'San Francisco',
        },
      ]}
    >
      <Toolbar>
        <DataFilter property="location" />
      </Toolbar>
    </Data>
  );
};
