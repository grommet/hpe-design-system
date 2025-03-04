import React from 'react';
import {
  Box,
  Button,
  List,
  Header,
  // Main,
  Menu,
  PageHeader,
  ResponsiveContext,
  Text,
  Page,
  PageContent,
} from 'grommet';
import { Monitor, More, User, System, Hpe } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';
import { ContentPane } from '../../../layouts';

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
            <TextEmphasis
              size="xsmall"
              color={!item.active ? 'text-weak' : null}
            >
              {item.active ? 'Active' : 'Inactive'}
            </TextEmphasis>
          )}
          <Menu
            icon={<More />}
            hoverIndicator
            items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
          />
        </Box>
      )}
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
              <TextEmphasis color={!datum.active ? 'text-weak' : null}>
                {datum.user}
              </TextEmphasis>
              <Text color={!datum.active ? 'text-weak' : null}>{datum.ip}</Text>
            </Box>
          </Box>
        </Box>
      )}
    </List>
  );
};

const AppHeaderExample = () => (
  <Header
    background="background-front"
    pad={{ vertical: 'xsmall', horizontal: 'medium' }}
  >
    <Button>
      <Box
        direction="row"
        align="start"
        gap="medium"
        pad={{ vertical: 'small' }}
        responsive={false}
      >
        <Hpe color="plain" height="medium" />
        <Box direction="row" gap="xsmall" wrap>
          <Text weight="bold" color="text-strong">
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

export const ListScreenExample = ({ ...rest }) => (
  <Box {...rest}>
    <AppHeaderExample />
    {/* Main is commented out for this example, but should be used in a
    real application. */}
    {/* <Main> */}
    <Page pad={{ bottom: 'large' }} flex={false}>
      <PageContent>
        <PageHeader
          title="User controls"
          actions={<Button label="Manage" primary />}
        />
        <ContentPane>
          <StyledList />
        </ContentPane>
      </PageContent>
    </Page>
    {/* </Main> */}
  </Box>
);
