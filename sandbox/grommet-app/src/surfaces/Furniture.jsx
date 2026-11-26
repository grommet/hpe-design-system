// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import { Box, Button, Image, Text, TextInput } from 'grommet';
import {
  Apps,
  Dashboard,
  Help,
  Home,
  Notification,
  Search,
  Server,
  Shield,
  User,
} from '@hpe-design/icons-grommet';
import PropTypes from 'prop-types';
import { SurfaceStateContext } from './surfaceState';

/**
 * Shell furniture for the validation pages, so the architectural regions
 * read as a UI rather than labelled boxes. Nothing here is a surface: the
 * rail paints background-contrast (a standard fill on whatever surface it
 * sits on, decision 15a) and everything else is transparent.
 */

const RAIL_ICONS = [
  ['Home', Home],
  ['Services', Apps],
  ['Dashboards', Dashboard],
  ['Devices', Server],
  ['Compliance', Shield],
];

export const Rail = ({ background = 'background-contrast', ...rest }) => (
  <Box
    as="nav"
    aria-label="Global"
    width="56px"
    flex={false}
    background={background}
    pad={{ vertical: 'small', horizontal: 'xsmall' }}
    align="center"
    justify="between"
    data-surface-token={background === 'background-contrast' ? 'none' : background}
    data-surface-label="Rail"
    {...rest}
  >
    <Box gap="xxsmall" align="center">
      {RAIL_ICONS.map(([name, Icon]) => (
        <Button
          key={name}
          icon={<Icon aria-hidden="true" />}
          a11yTitle={name}
          hoverIndicator
        />
      ))}
    </Box>
    <Box gap="xxsmall" align="center">
      <Button icon={<Help aria-hidden="true" />} a11yTitle="Help" hoverIndicator />
      <Button icon={<User aria-hidden="true" />} a11yTitle="Account" hoverIndicator />
    </Box>
  </Box>
);

Rail.propTypes = { background: PropTypes.string };

/** Brand mark, search, actions — transparent, inherits whatever it sits on. */
export const HeaderBar = ({ title, children }) => {
  const { colorMode } = useContext(SurfaceStateContext);
  const logo =
    colorMode === 'dark' ? '/hpe-grnlk-rev-rgb.svg' : '/hpe-grnlk-pos-rgb.svg';
  return (
    <Box
      as="header"
      direction="row"
      align="center"
      gap="medium"
      pad={{ vertical: 'xsmall' }}
      flex={false}
    >
      <Box height="28px" width="128px" flex={false}>
        <Image src={logo} alt="HPE GreenLake" fit="contain" />
      </Box>
      <Box width="medium" flex={false}>
        <TextInput
          icon={<Search aria-hidden="true" />}
          size="small"
          placeholder="Search"
          a11yTitle="Search"
          readOnly
        />
      </Box>
      <Box flex />
      {title}
      <Box direction="row" gap="xsmall" flex={false}>
        <Button icon={<Notification aria-hidden="true" />} a11yTitle="Notifications" />
        <Button icon={<Help aria-hidden="true" />} a11yTitle="Help" />
        <Button icon={<Apps aria-hidden="true" />} a11yTitle="Services" />
        <Button icon={<User aria-hidden="true" />} a11yTitle="Account" />
      </Box>
      {children}
    </Box>
  );
};

HeaderBar.propTypes = { title: PropTypes.node, children: PropTypes.node };

const NAV_ITEMS = ['Overview', 'Devices', 'Alerts', 'Subscriptions', 'Settings'];

/** A local-navigation list with a title row. */
export const NavList = ({ title = 'Menu title', active = 'Devices' }) => (
  <Box gap="xsmall" flex={false}>
    <Box direction="row" justify="between" align="center" pad={{ vertical: 'xsmall' }}>
      <Text weight={500}>{title}</Text>
    </Box>
    {NAV_ITEMS.map(item => (
      <Button
        key={item}
        label={item}
        plain
        hoverIndicator
        active={item === active}
        style={{ padding: '6px 8px', borderRadius: 4 }}
      />
    ))}
  </Box>
);

NavList.propTypes = { title: PropTypes.string, active: PropTypes.string };

/** Page title row: heading plus a primary action. */
export const PageTitle = ({ title = 'Devices', action = 'Add device' }) => (
  <Box direction="row" justify="between" align="center" flex={false}>
    <Text size="xxlarge" weight={600}>
      {title}
    </Text>
    <Button label={action} primary />
  </Box>
);

PageTitle.propTypes = { title: PropTypes.string, action: PropTypes.string };
