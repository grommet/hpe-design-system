import React, { useContext } from 'react';
import {
  Avatar,
  Header,
  Heading,
  Button,
  Box,
  Grid,
  Menu,
  ResponsiveContext,
  Sidebar,
  Footer,
  Text,
} from 'grommet';
import PropTypes from 'prop-types';

import {
  Apps,
  Chat,
  Clock,
  Hpe,
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
    <Grid
      gap="medium"
      columns={size !== 'small' ? 'small' : 'auto'}
      margin={size === 'small' ? { bottom: 'xlarge' } : undefined}
    >
      {data.map(dashboardItem => (
        <Box
          round="small"
          flex
          fill
          background={dashboardItem.color}
          key={`Tile ${dashboardItem.title}`}
          alignContent="center"
          onClick={() => {}}
        >
          <Box
            pad={{ horizontal: 'medium', vertical: 'small' }}
            gap="medium"
            fill
            justify="between"
            size="small"
            direction="column"
            align="start"
          >
            {dashboardItem.icon}
            <Box gap="medium">
              <Box>
                <Text size="medium" weight="bold">
                  {dashboardItem.title}
                </Text>
                <Text size="medium">{dashboardItem.subTitle}</Text>
              </Box>
            </Box>
          </Box>
          <Footer pad="small" background="background-contrast">
            <Text size="xsmall">{dashboardItem.message}</Text>
            {dashboardItem.message === 'Connected' && (
              <Box round pad="xsmall" background="green" />
            )}
          </Footer>
        </Box>
      ))}
    </Grid>
  );
};

const SidebarExample = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Sidebar
      background="blue"
      height={{ min: size !== 'small' ? '100%' : 'auto' }}
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
      <Header
        direction={size !== 'small' ? 'column' : 'row'}
        flex={size !== 'small'}
        gap="none"
        justify={size === 'small' ? 'between' : undefined}
      >
        <Button a11yTitle="Clock" icon={<Clock color="text-xweak" />} />
        <Button a11yTitle="Apps" icon={<Apps color="text-xweak" />} />
        <Button a11yTitle="Terminal" icon={<Terminal color="text-xweak" />} />
      </Header>

      {size !== 'small' && (
        <Footer direction={size !== 'small' ? 'column' : 'row'}>
          <Button a11yTitle="Chat" icon={<Chat color="text-xweak" />} />
          <Button
            a11yTitle="Help"
            icon={<StatusUnknown color="text-xweak" />}
          />
        </Footer>
      )}
    </Sidebar>
  );
};

const ScreenContainer = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
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
        <SidebarExample style={{ position: 'absolute', bottom: 0, left: 0 }} />
      )}
    </Box>
  );
};

const AppHeaderExample = () => (
  <Header pad={{ vertical: 'small' }}>
    <Button>
      <Box
        direction="row"
        align="center"
        gap="medium"
        pad={{ vertical: 'small' }}
        responsive={false}
      >
        <Hpe color="plain" />
        <Box direction="row" gap="xsmall">
          <Text weight="bold" size="medium">
            HPE
          </Text>
          <Text size="medium">Server</Text>
        </Box>
      </Box>
    </Button>
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

export const DashboardExample = () => {
  return (
    <ScreenContainer>
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
