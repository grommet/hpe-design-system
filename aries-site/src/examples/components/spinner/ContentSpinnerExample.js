import React, { useContext } from 'react';
import {
  Box,
  Button,
  Header,
  Menu,
  Tab,
  Tabs,
  Text,
  Spinner,
  ResponsiveContext,
  NameValueList,
  NameValuePair,
  PageHeader,
} from 'grommet';
import {
  Hpe,
  User,
  HelpOption,
  Menu as MenuIcon,
  Notification,
} from 'grommet-icons';

export const ContentSpinnerExample = () => {
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
            <Hpe color="brand" height="medium" />
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
            <Button a11yTitle="Help" icon={<HelpOption />} />
            <Button a11yTitle="Notifications" icon={<Notification />} />
            <Button a11yTitle="Account" icon={<User />} />
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
      <PageHeader title="MLOPS139906-82-11570" />
      <NameValueList
        nameProps={{
          width: ['xxsmall', 'small'],
        }}
      >
        <NameValuePair name="Status">Active</NameValuePair>
        <NameValuePair name="Appliance">
          MLOPS on HPE container Platform
        </NameValuePair>
        <NameValuePair name="Started on">2020-11-22 04:05:31.0</NameValuePair>
        <NameValuePair name="Last updated">2020-11-22 04:05:31.0</NameValuePair>
      </NameValueList>

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
};
