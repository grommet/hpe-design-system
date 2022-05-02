import React, { useContext } from 'react';
import {
  Box,
  Button,
  Header,
  Heading,
  Menu,
  Tab,
  Tabs,
  Text,
  Spinner,
  ResponsiveContext,
} from 'grommet';
import {
  Hpe,
  User,
  HelpOption,
  Menu as MenuIcon,
  Notification,
} from 'grommet-icons';

export function ContentSpinnerExample() {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);
  const size = useContext(ResponsiveContext);
  return (
    <>
      <Header fill="horizontal">
        <Button>
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
              <Text color="text-strong">App Name</Text>
            </Box>
          </Box>
        </Button>

        {!['xsmall', 'small'].includes(size) ? (
          <Box gap="xsmall" direction="row">
            <Button icon={<HelpOption />} />
            <Button icon={<Notification />} />
            <Button icon={<User />} />
          </Box>
        ) : (
          <Menu
            icon={<MenuIcon />}
            items={[
              { icon: <HelpOption /> },
              { icon: <Notification /> },
              { icon: <User /> },
            ]}
          />
        )}
      </Header>
      <Heading size="small"> MLOPS139906-82-11570</Heading>
      <Box gap="xlarge" direction="row-responsive">
        <Box direction="column">
          <Text>Status</Text>
          <Text>Appliance</Text>
          <Text>Started on</Text>
          <Text>Last updated</Text>
        </Box>
        <Box direction="column">
          <Text>Active</Text>
          <Text>MLOPS on HPE container Platform</Text>
          <Text>2020-11-22 04:05:31.0</Text>
          <Text>2020-11-22 04:05:31.0</Text>
        </Box>
      </Box>
      <Tabs
        margin={{ vertical: 'large' }}
        activeIndex={index}
        onActive={onActive}
        justify="start"
      >
        <Tab title="Customer Details">
          <Box align="center" justify="center" height={{ min: 'small' }}>
            <Spinner
              size="medium"
              message={{
                start: 'Loading customer details.',
                end: 'Customer details have been loaded.',
              }}
            />
          </Box>
        </Tab>
        <Tab title="Customization">
          <Box margin="small">Customization Information</Box>
        </Tab>
        <Tab title="Configuration">
          <Box margin="small">Billing Information</Box>
        </Tab>
      </Tabs>
    </>
  );
}
