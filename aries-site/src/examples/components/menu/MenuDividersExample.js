import PropTypes from 'prop-types';
import { MenuMock } from './MenuMock';

export const MenuDividersExample = ({ bestPractice = true }) => (
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
            [{ label: 'Edit' }],
            [{ label: 'View servers' }],
            [{ label: 'Add servers' }],
            [{ label: 'Remove servers' }],
            [{ label: 'Update firmware' }],
            [{ label: 'Update BIOS settings' }],
            [{ label: 'Delete' }],
          ]
    }
  />
);

MenuDividersExample.propTypes = {
  bestPractice: PropTypes.bool,
};
