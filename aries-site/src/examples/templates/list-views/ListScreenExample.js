import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  List,
  Header,
  Heading,
  Menu,
  ResponsiveContext,
  Sidebar,
  Text,
  ThemeContext,
} from 'grommet';
import {
  Apps,
  Chat,
  Clock,
  Terminal,
  Monitor,
  More,
  User,
  StatusUnknown,
  System,
  Hpe,
} from 'grommet-icons';

const data = [
  {
    user: 'lozzi@hpe.com',
    ip: '10.68.229.0',
    icon: color => <Monitor color={color} />,
    active: true,
  },
  {
    user: 'eric.soderberg@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: true,
  },
  {
    user: 'Guest',
    ip: '10.33.221.9',
    icon: color => <User color={color} />,
    active: false,
  },
  {
    user: 'Admin',
    ip: '10.45.229.1',
    icon: color => <System color={color} />,
    active: true,
  },
  {
    user: 'taylor.seamans@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: true,
  },
  {
    user: 'shimrit.yacobi@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: false,
  },
  {
    user: 'matthew.glissmann@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: false,
  },
];

const StyledList = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <List
      data={data}
      pad="small"
      action={(item, index) => (
        <Box key={index} direction="row" align="center" gap="medium">
          {size !== 'small' && (
            <Text
              weight="bold"
              size="xsmall"
              color={!item.active ? 'text-weak' : null}
            >
              {item.active ? 'Active' : 'Inactive'}
            </Text>
          )}
          <Menu
            icon={<More />}
            hoverIndicator
            items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
          />
        </Box>
      )}
      margin={size === 'small' ? { bottom: 'large' } : undefined}
    >
      {(datum, index) => (
        <Box
          key={index}
          gap="medium"
          direction="row"
          align="center"
          justify="between"
        >
          <Box alignSelf="center">
            {datum.icon(!datum.active && 'text-weak')}
          </Box>
          <Box align="center" gap="medium">
            <Box>
              <Text weight="bold" color={!datum.active ? 'text-weak' : null}>
                {datum.user}
              </Text>
              <Text color={!datum.active ? 'text-weak' : null}>{datum.ip}</Text>
            </Box>
          </Box>
        </Box>
      )}
    </List>
  );
};

const SidebarExample = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  return (
    <Sidebar
      background={{ color: !theme.dark ? 'background' : 'blue', dark: true }}
      direction={size !== 'small' ? 'column' : 'row'}
      pad={{
        horizontal: size !== 'small' ? 'small' : 'medium',
        vertical: size !== 'small' ? 'medium' : 'small',
      }}
      fill={size === 'small' ? 'horizontal' : undefined}
      flex={false}
      height={size === 'small' ? undefined : { min: '100%' }}
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
        <Button a11yTitle="Clock" icon={<Clock />} />
        <Button a11yTitle="Apps" icon={<Apps />} />
        <Button a11yTitle="Terminal" icon={<Terminal />} />
      </Box>

      {size !== 'small' && (
        <Box direction={size !== 'small' ? 'column' : 'row'}>
          <Button a11yTitle="Chat" icon={<Chat />} />
          <Button a11yTitle="Help" icon={<StatusUnknown />} />
        </Box>
      )}
    </Sidebar>
  );
};

const PageHeaderExample = ({ title }) => (
  <Header>
    <Heading margin={{ vertical: 'medium' }} size="small">
      {title}
    </Heading>
    <Button label="Manage" primary />
  </Header>
);

const AppHeaderExample = () => (
  <Header pad={{ vertical: 'small' }}>
    <Button>
      <Box
        direction="row"
        align="start"
        gap="medium"
        pad={{ vertical: 'small' }}
        responsive={false}
      >
        <Hpe color="plain" />
        <Box direction="row" gap="xsmall" wrap>
          <Text weight="bold" size="medium" color="text-strong">
            HPE
          </Text>
          <Text size="medium" color="text-strong">
            Server
          </Text>
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

const ScreenContainer = ({ mobile, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      background="background"
      width={size === 'small' ? 'medium' : '100%'}
      height={size === 'small' ? { max: 'large' } : undefined}
      style={{ position: 'relative' }}
      fill
    >
      <Box direction="row" width={{ max: 'xxlarge' }} margin="auto" fill>
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

export const ListScreenExample = ({ ...rest }) => (
  <ScreenContainer {...rest}>
    <AppHeaderExample />
    <PageHeaderExample title="User Controls" />
    <StyledList />
  </ScreenContainer>
);

PageHeaderExample.propTypes = {
  title: PropTypes.string,
};
ScreenContainer.propTypes = {
  mobile: PropTypes.bool,
};
