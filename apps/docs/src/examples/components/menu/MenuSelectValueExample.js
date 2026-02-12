import PropTypes from 'prop-types';
import { MenuMock } from './MenuMock';

export const MenuSelectValueExample = ({ bestPractice = true }) => {
  return (
    <MenuMock
      label="Servers"
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
