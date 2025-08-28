import React from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Capacity } from './Capacity';

export const DetailPane = ({ ...rest }) => {
  const [activeIndex, setActiveIndex] = React.useState(1);

  return (
    <Box {...rest}>
      <Tabs
        activeIndex={activeIndex}
        onActive={setActiveIndex}
        alignControls="start"
      >
        <Tab title="Issues">Issues</Tab>
        <Tab title="Capacity">
          <Box pad={{ top: 'medium' }}>
            <Capacity />
          </Box>
        </Tab>
        <Tab title="Protection">Protection</Tab>
        <Tab title="Performance">Performance</Tab>
        <Tab title="Hardware">Hardware</Tab>
        <Tab title="Software">Software</Tab>
        <Tab title="Networking">Networking</Tab>
        <Tab title="Settings">Settings</Tab>
      </Tabs>
    </Box>
  );
};
