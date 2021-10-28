import React from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Currency, HomeRounded, Notification, User } from 'grommet-icons';

export const TabWithIconExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box>
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="General" icon={<HomeRounded />}>
          <Box margin="small">General Information</Box>
        </Tab>
        <Tab title="Account" icon={<User />}>
          <Box margin="small">Account Information</Box>
        </Tab>
        <Tab title="Billing" icon={<Currency />}>
          <Box margin="small">Billing Information</Box>
        </Tab>
        <Tab title="Notifications" icon={<Notification />}>
          <Box margin="small">Notifications will show here.</Box>
        </Tab>
      </Tabs>
    </Box>
  );
};
