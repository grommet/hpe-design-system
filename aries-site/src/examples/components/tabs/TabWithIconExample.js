import React, { useState } from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Currency, HomeRounded, User } from 'grommet-icons';
import { TabContent } from './TabContent';

export const TabWithIconExample = () => {
  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box>
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="General" icon={<HomeRounded />}>
          <TabContent>General Information</TabContent>
        </Tab>
        <Tab title="Account" icon={<User />}>
          <TabContent>Account Information</TabContent>
        </Tab>
        <Tab title="Billing" icon={<Currency />}>
          <TabContent>Billing Information</TabContent>
        </Tab>
      </Tabs>
    </Box>
  );
};
