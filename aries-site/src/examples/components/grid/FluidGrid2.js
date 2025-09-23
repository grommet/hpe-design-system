import { Grid } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps as props } from './utils';

const contentAreaProps = {
  ...props,
  height: undefined,
};
// used for creating some variation in the ContentArea heights
const heightMap = {
  0: 'xsmall',
  1: 'xxsmall',
  2: '75%',
  3: 'xsmall',
};

const columns = 'xsmall';
const rows = '3xsmall';
const gap = 'xsmall';

export const FluidGrid2 = () => (
  <Grid columns={columns} rows={rows} gap={gap} align="start">
    {new Array(11).fill({}).map((item, index) => (
      <ContentArea
        key={index}
        title={index + 1}
        {...contentAreaProps}
        height={heightMap[index % 4]}
      />
    ))}
  </Grid>
);
