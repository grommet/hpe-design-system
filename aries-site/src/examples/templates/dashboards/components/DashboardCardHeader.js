import PropTypes from 'prop-types';
import { Box, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';

export const DashboardCardHeader = ({ title, level, subtitle, menuItems }) => (
  <Box direction="row" align="start" justify="between" fill>
    <Box>
      <Heading margin="none" level={level}>
        {title}
      </Heading>
      {subtitle && <Text>{subtitle}</Text>}
    </Box>
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
  subtitle: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func,
    }),
  ),
};
