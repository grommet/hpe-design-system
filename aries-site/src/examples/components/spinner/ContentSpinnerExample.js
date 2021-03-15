import React from 'react';
import {
  Box,
  Button,
  Header,
  Heading,
  Tab,
  Tabs,
  Text,
  Spinner,
} from 'grommet';
import { Hpe, User, HelpOption, Notification } from 'grommet-icons';

export const ContentSpinnerExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);

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
        <Box gap="medium" direction="row-responsive">
          <HelpOption />
          <Notification />
          <User />
        </Box>
      </Header>
      <Heading level={3}> MLOPS139906-82-11570</Heading>
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
          <Box justify="center" height="small" margin="small" gap="small">
            <Spinner alignSelf="center"></Spinner>
          </Box>
        </Tab>
        <Tab title="Customization">
          <Box margin="small" gap="small">
            Customization Information
          </Box>
        </Tab>
        <Tab title="Configuration">
          <Box margin="small">Billing Information</Box>
        </Tab>
      </Tabs>
    </>
  );
};
