import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  List,
  Header,
  Heading,
  Menu,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Monitor, More, User, System, Hpe } from 'grommet-icons';

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
          {!['xsmall', 'small'].includes(size) && (
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
      margin={
        ['xsmall', 'small'].includes(size) ? { bottom: 'large' } : undefined
      }
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
      width={['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      height={['xsmall', 'small'].includes(size) ? { max: 'large' } : undefined}
      style={{ position: 'relative' }}
      fill
    >
      <Box direction="row" width={{ max: 'xxlarge' }} margin="auto" fill>
        <Box
          overflow="auto"
          pad={{ horizontal: 'medium', bottom: 'medium' }}
          flex
          {...rest}
        />
      </Box>
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
