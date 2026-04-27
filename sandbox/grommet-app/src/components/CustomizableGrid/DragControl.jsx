import PropTypes from 'prop-types';
import { Button, Keyboard } from 'grommet';
import { Drag } from '@hpe-design/icons-grommet';

export const DragControl = ({ a11yTitle, ...rest }) => (
  <Keyboard {...rest}>
    <Button
      icon={<Drag />}
      a11yTitle={a11yTitle}
      style={{ cursor: 'move' }}
    />
  </Keyboard>
);

DragControl.propTypes = {
  a11yTitle: PropTypes.string,
};
