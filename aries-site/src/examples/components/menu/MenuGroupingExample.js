import PropTypes from 'prop-types';
import { Menu } from 'grommet';

export const MenuGroupingExample = ({ bestPractice }) => (
  <Menu
    label="Actions"
    open={true}
    items={[
      [{ label: 'View', onClick: () => {} }],
      [{ label: 'Update firmware', onClick: () => {} }],
    ]}
  />
);

MenuGroupingExample.propTypes = {
  bestPractice: PropTypes.object,
};
