import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Header,
  Heading,
  Button,
  Box,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Menu,
  Nav,
  ResponsiveContext,
  Sidebar,
  Text,
} from 'grommet';
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

const dashboardItems = [
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

export const DashboardExample = () => {
  return (
    <AppContainer>
      <AppSidebar>
        <NavItems />
      </AppSidebar>
      <Page>
        <AppHeader />
        <Dashboard />
      </Page>
    </AppContainer>
  );
};

const Dashboard = () => (
  <>
    <Header>
      <Heading level={2} margin={{ vertical: 'small' }}>
        Controls
      </Heading>
      <Button label="Manage" primary />
    </Header>
    <DashboardCards />
  </>
);

const DashboardCards = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid
      gap="medium"
      columns={size !== 'small' ? 'small' : 'auto'}
      rows="small"
      margin={size === 'small' ? { bottom: 'xlarge' } : undefined}
    >
      {dashboardItems.map(item => (
        <DashboardCard content={item} />
      ))}
    </Grid>
  );
};

const DashboardCard = ({ content }) => {
  const cornerSize = 'small';

  return (
    <Card
      alignContent="center"
      background={content.color}
      elevation="none"
      key={`Card ${content.title}`}
      onClick={() => {}}
      round={cornerSize}
    >
      <CardBody
        align="start"
        gap="medium"
        pad={{ horizontal: 'medium', vertical: 'small' }}
      >
        {content.icon}
        <Box>
          <Text size="medium" weight="bold">
            {content.title}
          </Text>
          <Text size="medium">{content.subTitle}</Text>
        </Box>
      </CardBody>
      <CardFooter pad="small">
        <Text size="xsmall">{content.message}</Text>
        {content.message === 'Connected' && (
          <Box round pad="xsmall" background="green" />
        )}
      </CardFooter>
    </Card>
  );
};

const Page = ({ children }) => {
  return (
    <Box flex overflow="auto">
      <Box pad={{ horizontal: 'medium', bottom: 'large' }} flex="grow">
        {children}
      </Box>
    </Box>
  );
};

const AppSidebar = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Sidebar
      /* Sidebar should switch from column to row orientation 
      when on smaller screens */
      direction={size !== 'small' ? 'column' : 'row'}
      /* Only display most critical navigation items in mobile 
      contexts */
      header={
        size !== 'small' && (
          <Avatar
            margin={{ bottom: 'medium' }}
            src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
          />
        )
      }
      footer={
        size !== 'small' && (
          <Box gap="medium">
            <Button a11yTitle="Chat" icon={<Chat color="text-xweak" />} />
            <Button
              a11yTitle="Help"
              icon={<StatusUnknown color="text-xweak" />}
            />
          </Box>
        )
      }
      /* Min height is not needed in mobile contexts */
      height={size !== 'small' ? { min: '100%' } : undefined}
      align="center"
      background="blue!"
      pad={{
        top: size !== 'small' ? 'medium' : 'small',
        bottom: 'medium',
        horizontal: size !== 'small' ? 'medium' : 'small',
      }}
      {...rest}
    />
  );
};

const NavItems = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Nav direction={size !== 'small' ? 'column' : 'row'} justify="evenly">
      <Button a11yTitle="Clock" icon={<Clock color="text-xweak" />} />
      <Button a11yTitle="Apps" icon={<Apps color="text-xweak" />} active />
      <Button a11yTitle="Terminal" icon={<Terminal color="text-xweak" />} />
    </Nav>
  );
};

const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={size === 'small' ? 'column-reverse' : 'row'}
      background="background-back"
      height={size === 'small' ? { max: 'large' } : undefined}
      width={size === 'small' ? 'medium' : '100%'}
      fill
      {...rest}
    />
  );
};

const AppHeader = () => (
  <Header fill="horizontal" height="xsmall">
    <AppIdentity name="Server" />
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

const AppIdentity = ({ name }) => (
  <Button plain>
    <Box
      direction="row"
      align="start"
      gap="medium"
      // pad maintains accessible hit target
      // non-responsive maintains same dimensions for mobile
      pad={{ vertical: 'small' }}
      responsive={false}
    >
      <Hpe color="brand" />
      <Box direction="row" gap="xsmall" wrap>
        <Text color="text-strong" weight="bold">
          HPE
        </Text>
        <Text color="text-strong">{name}</Text>
      </Box>
    </Box>
  </Button>
);

AppIdentity.propTypes = {
  name: PropTypes.string,
};

Page.propTypes = {
  children: PropTypes.element,
};

DashboardCard.propTypes = {
  content: PropTypes.shape({
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    icon: PropTypes.element,
    message: PropTypes.string,
    subTitle: PropTypes.string,
    title: PropTypes.string,
  }),
};
