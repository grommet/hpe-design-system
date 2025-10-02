import { Box, Grid } from 'grommet';
import { ContentArea } from '../page-layouts/anatomy/components';

const demoStyle = { border: { style: 'dashed' }, pad: '3xsmall' };

const parentGrid = {
  columns: ['xsmall', 'flex'],
  gap: 'medium',
};

export const NestedGrid = () => (
  <ContentArea title="Parent Grid" {...demoStyle}>
    <Grid columns={parentGrid.columns} gap={parentGrid.gap}>
      <ContentArea background="orange" {...demoStyle} />
      <Box gap="xsmall">
        <NestedGridA />
        <NestedGridB />
      </Box>
    </Grid>
  </ContentArea>
);

const nestedGridA = {
  columns: ['5xsmall', 'flex'],
  rows: '3xsmall',
  gap: 'xsmall',
};

const NestedGridA = () => (
  <ContentArea title="Nested Grid A" {...demoStyle}>
    <Grid
      columns={nestedGridA.columns}
      rows={nestedGridA.rows}
      gap={nestedGridA.gap}
    >
      <ContentArea background="orange" {...demoStyle} />
      <ContentArea background="orange" {...demoStyle} />
    </Grid>
  </ContentArea>
);

const nestedGridB = {
  columns: ['60%', 'flex'],
  rows: 'auto',
  gap: 'xsmall',
};

const NestedGridB = () => (
  <ContentArea title="Nested Grid B" {...demoStyle}>
    <Grid
      columns={nestedGridB.columns}
      rows={nestedGridB.rows}
      gap={nestedGridB.gap}
    >
      <ContentArea background="orange" height="xsmall" {...demoStyle} />
      <Box gap="3xsmall">
        <ContentArea border background="orange" height="5xsmall" />
        <ContentArea border background="orange" height="3xsmall" />
      </Box>
    </Grid>
  </ContentArea>
);
