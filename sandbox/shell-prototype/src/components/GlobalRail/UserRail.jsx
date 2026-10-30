// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Avatar, Box, Button, DropButton, Text, Tip } from 'grommet';
import {
  Help,
  Moon,
  Note,
  Notification as NotificationIcon,
  StatusCritical,
  StatusGood,
  StatusWarning,
  Sun,
} from '@hpe-design/icons-grommet';
import PropTypes from 'prop-types';
import { useShell } from '../../contexts/ShellContext';
import { notifications } from '../../data/context';
import { user } from '../../data/copilot';
import {
  RAIL_ICON_SIZE,
  RailButton,
  RailDivider,
  RailDropButton,
} from './RailButton';

const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

const statusIcon = {
  critical: <StatusCritical color="status-critical" aria-hidden="true" />,
  warning: <StatusWarning color="status-warning" aria-hidden="true" />,
  normal: <StatusGood color="status-ok" aria-hidden="true" />,
};

const PopoverSection = ({ title, children }) => (
  <Box gap="xsmall">
    {title && (
      <Text size="small" weight={500} color="text-strong">
        {title}
      </Text>
    )}
    {children}
  </Box>
);

PopoverSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

const HelpContent = () => {
  const { dispatch } = useShell();
  const items = [
    'Documentation',
    'What’s new',
    'Support center',
    'Keyboard shortcuts',
  ];
  return (
    <Box pad="small" gap="small" width="small">
      <PopoverSection title="Help">
        <Box>
          {items.map(label => (
            <Button
              key={label}
              label={label}
              size="small"
              alignSelf="start"
              onClick={() =>
                dispatch({
                  type: 'SHOW_TOAST',
                  title: label,
                  message: 'This would open HPE GreenLake help resources.',
                })
              }
            />
          ))}
        </Box>
      </PopoverSection>
    </Box>
  );
};

const NotificationsContent = () => (
  <Box pad="small" gap="small" width="medium">
    <Box direction="row" justify="between" align="center">
      <Text size="small" weight={500} color="text-strong">
        Notifications
      </Text>
      <Button label="Mark all read" size="xsmall" />
    </Box>
    <Box>
      {notifications.map(item => (
        <Box
          key={item.id}
          direction="row"
          gap="small"
          pad={{ vertical: 'xsmall' }}
          border={{ side: 'bottom', color: 'border-weak' }}
        >
          <Box flex={false} pad={{ top: '5xsmall' }}>
            {statusIcon[item.status]}
          </Box>
          <Box gap="3xsmall">
            <Text size="small" color="text-strong">
              {item.title}
            </Text>
            <Text size="xsmall" color="text-weak">
              {item.message} · {item.when}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
    <Button label="View all notifications" size="small" alignSelf="start" />
  </Box>
);

const AccountContent = () => {
  const { dispatch } = useShell();
  return (
    <Box width="medium">
      <Box pad="small" direction="row" gap="small" align="center">
        <Avatar
          size="large"
          background="background-accent-blue-strong"
          round="medium"
        >
          <Text size="large" color="text-onStrong">
            {initials}
          </Text>
        </Avatar>
        <Box>
          <Text weight={500} color="text-strong">
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text size="small">{user.email}</Text>
          <Text size="xsmall" color="text-weak">
            {user.role}
          </Text>
        </Box>
      </Box>
      <Box
        border={{ side: 'top', color: 'border-weak' }}
        direction="row"
        justify="between"
        pad={{ horizontal: '3xsmall', vertical: 'xsmall' }}
      >
        <Button label="Preferences" size="small" />
        <Button
          label="Sign out"
          size="small"
          onClick={() =>
            dispatch({
              type: 'SHOW_TOAST',
              title: 'Signed out',
              message:
                'In the real shell this returns you to the sign-in page.',
            })
          }
        />
      </Box>
    </Box>
  );
};

// Global rail — User (bottom). Global and personal only.
export const UserRail = () => {
  const { dispatch, themeMode, setThemeMode } = useShell();
  const dark = themeMode === 'dark';
  const unread = notifications.length;

  return (
    <Box
      as="section"
      aria-label="You"
      gap="xxsmall"
      align="center"
      flex={false}
    >
      <RailDivider />
      <RailDropButton
        icon={<Help size={RAIL_ICON_SIZE} aria-hidden="true" />}
        label="Help"
        dropContent={<HelpContent />}
      />
      <RailButton
        icon={<Note size={RAIL_ICON_SIZE} aria-hidden="true" />}
        label="Feedback"
        onClick={() => dispatch({ type: 'OPEN_FEEDBACK' })}
      />
      <RailDropButton
        icon={<NotificationIcon size={RAIL_ICON_SIZE} aria-hidden="true" />}
        label={`Notifications, ${unread} unread`}
        tip="Notifications"
        badge={unread > 0 ? unread : undefined}
        dropContent={<NotificationsContent />}
      />
      <RailButton
        icon={
          dark ? (
            <Sun size={RAIL_ICON_SIZE} aria-hidden="true" />
          ) : (
            <Moon size={RAIL_ICON_SIZE} aria-hidden="true" />
          )
        }
        label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        tip="Appearance"
        onClick={() => setThemeMode(dark ? 'light' : 'dark')}
      />
      <Tip
        content={`${user.firstName} ${user.lastName}`}
        dropProps={{ align: { left: 'right' } }}
      >
        <DropButton
          plain
          a11yTitle={`Account, ${user.firstName} ${user.lastName}`}
          dropAlign={{ bottom: 'bottom', left: 'right' }}
          dropProps={{ margin: { left: 'xsmall' }, round: 'small' }}
          dropContent={<AccountContent />}
        >
          {/* Strong accent + onStrong text, per the docs Avatar guidance.
              Grommet drops a11yTitle when the child is a node, so the
              DropButton carries the accessible name. */}
          <Avatar
            size="medium"
            background="background-accent-blue-strong"
            round="medium"
          >
            <Text color="text-onStrong">{initials}</Text>
          </Avatar>
        </DropButton>
      </Tip>
    </Box>
  );
};
