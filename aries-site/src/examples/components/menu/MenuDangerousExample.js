import PropTypes from 'prop-types';
import { Menu } from 'grommet';

export const MenuDangerousExample = ({ bestPractice }) => (
  <Menu
    label="Actions"
    open={true}
    items={[{ label: 'Delete', onClick: () => {} }]}
  />
);

MenuDangerousExample.propTypes = {
  bestPractice: PropTypes.object,
};
