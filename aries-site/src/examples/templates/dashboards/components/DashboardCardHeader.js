import PropTypes from 'prop-types';
import { Box, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';

export const DashboardCardHeader = ({ title, menuItems }) => (
  <Box direction="row" align="start" justify="between" fill>
    <Text size="xlarge" color="text-strong" weight="bold">
      {title}
    </Text>
    {menuItems && (
      <Menu
        icon={<MoreVertical />}
        items={menuItems}
        dropAlign={{ top: 'bottom', right: 'right' }}
      />
    )}
  </Box>
);

DashboardCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func,
    }),
  ),
};
