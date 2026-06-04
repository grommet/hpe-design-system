import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Drag } from '@hpe-design/icons-grommet';

export const DragControl = ({ a11yTitle, ...rest }) => (
  <Box pad={{ vertical: 'xsmall' }} {...rest}>
    <Drag a11yTitle={a11yTitle} style={{ cursor: 'move' }} />
  </Box>
);

DragControl.propTypes = {
  a11yTitle: PropTypes.string,
};
