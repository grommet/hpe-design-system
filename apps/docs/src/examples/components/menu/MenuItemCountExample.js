import PropTypes from 'prop-types';
import { MenuMock } from './MenuMock';

export const MenuItemCountExample = ({ bestPractice = true }) => (
  <MenuMock
    label="Servers"
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
              { label: 'Reset servers' },
              { label: 'Update firmware' },
              { label: 'Update BIOS settings' },
            ],
            [{ label: 'Delete' }],
          ]
    }
  />
);

MenuItemCountExample.propTypes = {
  bestPractice: PropTypes.bool,
};
