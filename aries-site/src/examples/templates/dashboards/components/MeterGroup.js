import PropTypes from 'prop-types';
import { Grid } from 'grommet';

const columns = ['5xsmall', 'auto', '5xsmall'];

export const MeterGroup = ({ children, gap = 'xsmall', ...rest }) => (
  <Grid columns={columns} rows="auto" gap={gap} {...rest}>
    {children}
  </Grid>
);

MeterGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  gap: PropTypes.string,
};
