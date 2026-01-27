import PropTypes from 'prop-types';
import { Menu } from 'grommet';

export const MenuItemCountExample = ({ bestPractice = true }) => (
  <Menu
    label="Servers"
    open
    items={
      bestPractice
        ? [
            { label: 'Edit' },
            { label: 'View servers' },
            { label: 'Add servers' },
            { label: 'Remove servers' },
          ]
        : [
            [
              { label: 'Edit' },
              { label: 'View servers' },
              { label: 'Add servers' },
              { label: 'Remove servers' },
            ],
            [
              { label: 'Update firmware' },
              { label: 'Update BIOS settings' },
              { label: 'Action' },
              { label: 'Action' },
            ],
          ]
    }
  />
);

MenuItemCountExample.propTypes = {
  bestPractice: PropTypes.bool,
};
