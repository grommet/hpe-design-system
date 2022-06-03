import PropTypes from 'prop-types';
import { Menu } from 'grommet';

const items = [
  { label: 'View Details', onClick: () => {} },
  { label: 'Edit Permissions', onClick: () => {} },
  { label: 'Update Password', onClick: () => {} },
  { label: 'Delete', onClick: () => {} },
];

export const MenuDangerousExample = ({ bestPractice = true }) => (
  <Menu
    label="Actions"
    open
    items={
      bestPractice
        ? [[items[0], items[1], items[2]], [items[items.length - 1]]]
        : items
    }
  />
);

MenuDangerousExample.propTypes = {
  bestPractice: PropTypes.bool,
};
