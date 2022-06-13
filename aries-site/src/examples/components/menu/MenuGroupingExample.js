import PropTypes from 'prop-types';
import { Menu } from 'grommet';

export const MenuGroupingExample = ({ bestPractice = true }) => (
  <Menu
    label="Actions"
    open
    items={
      bestPractice
        ? [
            { label: 'View', onClick: () => {} },
            { label: 'Add to group', onClick: () => {} },
            { label: 'Update firmware', onClick: () => {} },
          ]
        : [
            [{ label: 'View', onClick: () => {} }],
            [{ label: 'Add to group', onClick: () => {} }],
            [{ label: 'Update firmware', onClick: () => {} }],
          ]
    }
  />
);

MenuGroupingExample.propTypes = {
  bestPractice: PropTypes.bool,
};
