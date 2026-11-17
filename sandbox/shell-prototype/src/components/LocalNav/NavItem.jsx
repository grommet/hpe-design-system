// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Down, NewWindow, Right } from '@hpe-design/icons-grommet';

// Selected marker from the design system navigation pattern: a 4px bar on
// the leading edge in the primary colour. Rendered transparent when inactive
// so labels keep the same alignment.
const ActiveMarker = ({ active, hover }) => (
  <Box
    background={
      active
        ? hover
          ? 'background-primary-strong-hover'
          : 'background-primary-strong'
        : undefined
    }
    alignSelf="stretch"
    pad={{ left: '4xsmall' }}
    round
    flex={false}
  />
);

ActiveMarker.propTypes = {
  active: PropTypes.bool,
  hover: PropTypes.bool,
};

// Shared navigation row used by every panel in the navigation slot
// (service nav, capability menus, GreenLake AI history). Follows the design
// system navigation pattern: active rows take `background-active` and a
// primary-coloured marker on the leading edge.
export const NavItem = ({
  label,
  description,
  active,
  expandable,
  expanded,
  external,
  indent,
  icon,
  onClick,
}) => (
  <Button
    plain
    fill="horizontal"
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    aria-expanded={expandable ? expanded : undefined}
  >
    {({ hover }) => (
      <Box
        direction="row"
        round="small"
        background={active ? 'background-active' : undefined}
        responsive={false}
      >
        <Box
          direction="row"
          align="center"
          justify="between"
          gap="small"
          flex
          pad={{
            vertical: 'xxsmall',
            right: 'xsmall',
            left: indent ? 'small' : '3xsmall',
          }}
          round="small"
          background={hover ? 'background-hover' : undefined}
          responsive={false}
        >
          <Box direction="row" gap="3xsmall" align="center" flex>
            <ActiveMarker active={active} hover={hover} />
            <Box direction="row" gap="xsmall" align="center" flex>
              {icon}
              <Box>
                <Text
                  size="small"
                  color={active || hover ? 'text-strong' : 'text'}
                  truncate
                >
                  {label}
                </Text>
                {description && (
                  <Text size="xsmall" color="text-weak">
                    {description}
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
          {expandable &&
            (expanded ? (
              <Down size="small" aria-hidden="true" />
            ) : (
              <Right size="small" aria-hidden="true" />
            ))}
          {external && <NewWindow size="small" aria-hidden="true" />}
        </Box>
      </Box>
    )}
  </Button>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  external: PropTypes.bool,
  indent: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export const NavDivider = () => (
  <Box
    flex={false}
    border={{ side: 'top', color: 'border-weak' }}
    margin={{ vertical: 'xsmall' }}
  />
);

export const NavSectionHeading = ({ label, action }) => (
  <Box
    direction="row"
    justify="between"
    align="center"
    pad={{ horizontal: 'xsmall', top: 'xsmall', bottom: '3xsmall' }}
  >
    <Text size="small" weight={500} color="text-strong">
      {label}
    </Text>
    {action}
  </Box>
);

NavSectionHeading.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.node,
};
