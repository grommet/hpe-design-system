import React, { useRef, useEffect } from 'react';
import { Box, ToggleGroup } from 'grommet';
import { Table, List, Map } from '@hpe-design/icons-grommet';

export const ToggleGroupPreview = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const buttons = ref.current.querySelectorAll('button');
      buttons.forEach(button => {
        button.setAttribute('tabindex', '-1');
      });
    }
  }, []);

  return (
    <Box align="center" justify="center" ref={ref}>
      <ToggleGroup
        options={[
          {
            icon: <Table />,
            value: 'table',
          },
          {
            icon: <List />,
            value: 'list',
          },
          {
            icon: <Map />,
            value: 'map',
          },
        ]}
      />
    </Box>
  );
};
