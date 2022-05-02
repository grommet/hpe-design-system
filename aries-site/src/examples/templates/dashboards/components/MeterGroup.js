import PropTypes from 'prop-types';
import { Grid } from 'grommet';

const columns = ['xxsmall', 'auto', 'xxsmall'];

export function MeterGroup({ children, gap = 'small', ...rest }) {
  return <Grid columns={columns} rows="auto" gap={gap} {...rest}>
    {children}
  </Grid>;
}

MeterGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  gap: PropTypes.string,
};
