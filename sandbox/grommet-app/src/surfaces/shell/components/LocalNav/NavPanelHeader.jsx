// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Menu, Text } from 'grommet';
import { Bookmark, Close, More } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';

// Title row for the navigation slot: name of what you have entered plus
// its page-independent actions (more, pin/bookmark). `onClose` is only
// supplied when the panel is shown as an overlay on small screens.
export const NavPanelHeader = ({
  title,
  pinnable,
  serviceId,
  menuItems,
  onClose,
}) => {
  const { pinnedServices, dispatch } = useShell();
  const pinned = serviceId ? pinnedServices.includes(serviceId) : false;

  return (
    <Box
      direction="row"
      align="start"
      justify="between"
      gap="small"
      flex={false}
    >
      <Text
        size="medium"
        weight={500}
        color="text-strong"
        margin={{ vertical: '3xsmall' }}
      >
        {title}
      </Text>
      <Box direction="row" flex={false}>
        {menuItems && (
          <Menu
            icon={<More aria-hidden="true" />}
            a11yTitle={`More actions for ${title}`}
            dropAlign={{ top: 'bottom', left: 'left' }}
            items={menuItems}
          />
        )}
        {pinnable && (
          <Button
            icon={
              <Bookmark
                color={pinned ? 'brand' : undefined}
                aria-hidden="true"
              />
            }
            a11yTitle={
              pinned ? `Unpin ${title} from rail` : `Pin ${title} to rail`
            }
            tip={pinned ? 'Unpin from rail' : 'Pin to rail'}
            active={pinned}
            onClick={() => dispatch({ type: 'TOGGLE_PIN', serviceId })}
          />
        )}
        {onClose && (
          <Button
            icon={<Close aria-hidden="true" />}
            a11yTitle="Close navigation"
            onClick={onClose}
          />
        )}
      </Box>
    </Box>
  );
};

NavPanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
  pinnable: PropTypes.bool,
  serviceId: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func,
};
