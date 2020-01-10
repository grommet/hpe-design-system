import React from 'react';
import { Tab, Tabs } from 'aries-core';
import { Box } from 'grommet';

export const TabsExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box pad="large" background="background-front">
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="General">
          <Box margin="small">User Information</Box>
        </Tab>
        <Tab title="Account">
          <Box margin="small">Account Information</Box>
        </Tab>
        <Tab title="Billing">
          <Box margin="small">Billing Information</Box>
        </Tab>
        <Tab title="Notifications">
          <Box margin="small">Notifications will show here.</Box>
        </Tab>
        <Tab title="Security">
          <Box margin="small">Security Information</Box>
        </Tab>
        <Tab title="Integrations">
          <Box margin="small">Integrations Information</Box>
        </Tab>
      </Tabs>
    </Box>
  );
};
