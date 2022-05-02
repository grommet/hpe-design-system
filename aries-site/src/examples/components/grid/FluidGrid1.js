import { Grid } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps as props } from './utils';

const contentAreaProps = {
  ...props,
  height: undefined,
};

const columns = 'small';
const rows = 'xsmall';
const gap = 'small';

export function FluidGrid1() {
  return <Grid columns={columns} rows={rows} gap={gap}>
    {new Array(11).fill({}).map((item, index) => (
      <ContentArea key={index} title={index + 1} {...contentAreaProps} />
    ))}
  </Grid>;
}
