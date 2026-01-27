import PropTypes from 'prop-types';
import { Menu } from 'grommet';

export const MenuSelectValueExample = ({ bestPractice = true }) => {
  return (
    <Menu
      label="Servers"
      open
      items={
        bestPractice
          ? [
              [
                { label: 'Edit' },
                {
                  label: 'View servers',
                },
                { label: 'Add servers' },
                { label: 'Remove servers' },
              ],
              [{ label: 'Update firmware' }, { label: 'Update BIOS settings' }],
              [{ label: 'Delete' }],
            ]
          : [
              { label: 'Server 1' },
              { label: 'Server 2' },
              { label: 'Server 3' },
              { label: 'Server 4' },
            ]
      }
    />
  );
};

MenuSelectValueExample.propTypes = {
  bestPractice: PropTypes.bool,
};
