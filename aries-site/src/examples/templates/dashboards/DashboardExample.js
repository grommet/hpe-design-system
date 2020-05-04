import React, { useContext } from 'react';
import { AppIdentity, Identifier, Tiles, Tile } from 'aries-core';
import {
  Avatar,
  Header,
  Heading,
  Button,
  Box,
  Menu,
  ResponsiveContext,
  Footer,
  Text,
} from 'grommet';
import PropTypes from 'prop-types';

import {
  Apps,
  Chat,
  Clock,
  Terminal,
  StatusUnknown,
  Wifi,
  System,
  User,
  Tasks,
  Location,
  ShieldSecurity,
} from 'grommet-icons';

const data = [
  {
    color: 'blue',
    icon: <Wifi />,
    title: 'Remote Access',
    subTitle: 'Lights out Management (LOM)',
    message: 'Connected',
  },
  {
    color: 'green',
    icon: <System />,
    title: 'System',
    subTitle: 'Sub-system and Devices',
    message: 'Composable System',
  },
  {
    color: 'red',
    icon: <User />,
    title: 'User Sessions',
    subTitle: 'User Access on Server',
    message: '4 active sessions',
  },
  {
    color: 'purple',
    icon: <Tasks />,
    title: 'Logs',
    subTitle: 'Events, Integration, and Status',
    message: '204,353',
  },
  {
    color: 'orange',
    icon: <Location />,
    title: 'Beacons',
    subTitle: 'Uniqe identification light',
    message: '24 beacons connected',
  },
  {
    color: 'teal',
    icon: <ShieldSecurity />,
    title: 'Security',
    subTitle: 'Trusted Platform Module',
    message: 'No Module Connected',
  },
];

const DashboardTiles = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Tiles
      gap="medium"
      columns={size !== 'small' ? 'small' : 'auto'}
      margin={size === 'small' ? { bottom: 'xlarge' } : undefined}
    >
      {data.map(value => (
        <Tile
          background={value.color}
          key={`Tile ${value.title}`}
          alignContent="center"
          onClick={() => {}}
        >
          <Identifier
            pad={{ horizontal: 'medium', vertical: 'small' }}
            title={value.title}
            subTitle={value.subTitle}
            size="small"
            gap="medium"
            direction="column"
            align="start"
          >
            {value.icon}
          </Identifier>
          <Box flex />
          <Footer pad="small" background="background-contrast">
            <Text size="xsmall">{value.message}</Text>
            {value.message === 'Connected' && (
              <Box round pad="xsmall" background="green" />
            )}
          </Footer>
        </Tile>
      ))}
    </Tiles>
  );
};

const SidebarExample = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      background="blue"
      direction={size !== 'small' ? 'column' : 'row'}
      pad={{
        horizontal: size !== 'small' ? 'small' : 'medium',
        vertical: size !== 'small' ? 'medium' : 'small',
      }}
      fill={size !== 'small' ? 'vertical' : 'horizontal'}
      {...rest}
    >
      {size !== 'small' && (
        <Avatar
          margin={{ bottom: 'medium' }}
          src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
        />
      )}
      <Box
        flex="grow"
        direction={size !== 'small' ? 'column' : 'row'}
        justify={size === 'small' ? 'between' : undefined}
      >
        <Button a11yTitle="Clock" icon={<Clock color="text-xweak" />} />
        <Button a11yTitle="Apps" icon={<Apps color="text-xweak" />} />
        <Button a11yTitle="Terminal" icon={<Terminal color="text-xweak" />} />
      </Box>

      {size !== 'small' && (
        <Box direction={size !== 'small' ? 'column' : 'row'}>
          <Button a11yTitle="Chat" icon={<Chat color="text-xweak" />} />
          <Button
            a11yTitle="Help"
            icon={<StatusUnknown color="text-xweak" />}
          />
        </Box>
      )}
    </Box>
  );
};

const ScreenContainer = ({ mobile, ...rest }) => (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          background="background-back"
          width={size === 'small' ? 'medium' : '100%'}
          height={size === 'small' ? { max: 'large' } : undefined}
          style={{ position: 'relative' }}
        >
          <Box direction="row" fill>
            {size !== 'small' && <SidebarExample />}
            <Box
              overflow="auto"
              pad={{ horizontal: 'medium', bottom: 'medium' }}
              flex
              {...rest}
            />
          </Box>
          {size === 'small' && (
            <SidebarExample
              style={{ position: 'absolute', bottom: 0, left: 0 }}
            />
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
);

const AppHeaderExample = () => (
  <Header pad={{ vertical: 'small' }}>
    <AppIdentity title="Server" brand="hpe" />
    <Box direction="row" gap="small">
      <Menu
        label="Master Control"
        items={[
          { label: 'Flynn ISO 01' },
          { label: 'TRON_SERV8r' },
          { label: 'HPE-Server-101' },
        ]}
      />
    </Box>
  </Header>
);

const PageHeaderExample = ({ title }) => (
  <Header>
    <Heading margin={{ vertical: 'medium' }} size="small">
      {title}
    </Heading>
    <Button label="Manage" primary />
  </Header>
);

export const DashboardExample = ({ ...rest }) => {
  return (
    <ScreenContainer {...rest}>
      <AppHeaderExample />
      <PageHeaderExample title="Controls" />
      <DashboardTiles />
    </ScreenContainer>
  );
};

ScreenContainer.propTypes = {
  mobile: PropTypes.bool,
};
PageHeaderExample.propTypes = {
  title: PropTypes.string,
};
