import React from 'react';
import { Box, Tabs, Tab } from 'grommet';

export const TabsPreview = () => {
  return (
    <Tabs>
      <Tab title="Tab 1">
        <Box pad="medium">One</Box>
      </Tab>
      <Tab title="Tab 2" />
    </Tabs>
  );
};
