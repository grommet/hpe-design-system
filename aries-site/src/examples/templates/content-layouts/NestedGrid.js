import { Box, Grid } from 'grommet';
import { ContentArea } from '../page-layouts/anatomy/components';

const demoStyle = { border: { style: 'dashed' }, pad: 'xsmall' };

const parentGrid = {
  columns: ['small', 'flex'],
  gap: 'medium',
};

export const NestedGrid = () => (
  <ContentArea title="Parent Grid" {...demoStyle}>
    <Grid columns={parentGrid.columns} gap={parentGrid.gap}>
      <ContentArea background="orange" {...demoStyle} />
      <Box gap="small" {...demoStyle}>
        <NestedGridA />
        <NestedGridB />
      </Box>
    </Grid>
  </ContentArea>
);

const nestedGridA = {
  columns: ['xxsmall', 'flex'],
  rows: 'xsmall',
  gap: 'small',
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
  gap: 'small',
};

const NestedGridB = () => (
  <ContentArea title="Nested Grid B" {...demoStyle}>
    <Grid
      columns={nestedGridB.columns}
      rows={nestedGridB.rows}
      gap={nestedGridB.gap}
    >
      <ContentArea background="orange" height="small" {...demoStyle} />
      <Box gap="xsmall" {...demoStyle}>
        <ContentArea border background="orange" height="xxsmall" />
        <ContentArea border background="orange" height="xsmall" />
      </Box>
    </Grid>
  </ContentArea>
);
