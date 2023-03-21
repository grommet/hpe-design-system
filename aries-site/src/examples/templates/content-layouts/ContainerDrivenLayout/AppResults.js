import { useContext } from 'react';
import {
  Box,
  Card,
  Cards,
  Grid,
  Text, // REMOVE ME LATER
  Heading,
  ResponsiveContext,
} from 'grommet';

const appGrid = {
  columns: {
    xsmall: 'auto',
    small: ['auto', 'auto'],
    medium: { count: 'fit', size: ['1/2', 'auto'] },
    large: { count: 'fit', size: ['1/3', 'auto'] },
    xlarge: { count: 'fit', size: ['1/4', 'auto'] },
  },
  rows: 'small',
  gap: {
    xsmall: 'medium',
    small: 'small',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  },
};

export const AppResults = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      {/* <Heading level={2} size="small" pad="small"> */}
      <Heading level={2} size="small">
        Apps
      </Heading>
      <Cards
        columns={appGrid.columns[breakpoint]}
        rows={appGrid.rows}
        gap={appGrid.gap[breakpoint]}
      >
        {app => <Card key={app.id} fill />}
      </Cards>
      {/* </Grid> */}
    </Box>
  );
};
