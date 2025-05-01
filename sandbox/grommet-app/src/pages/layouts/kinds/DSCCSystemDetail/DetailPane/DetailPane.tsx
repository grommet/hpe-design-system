import React from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Capacity } from './Capacity';
import { StatusCriticalSmall } from 'grommet-icons';

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
        <Tab
          title="Software"
          // icon={<StatusCriticalSmall color="icon-critical" />}
          // reverse
          badge={
            <Box
              round="full"
              background="background-critical"
              border={{ color: 'background-front' }}
            >
              <StatusCriticalSmall color="icon-critical" />
            </Box>
          }
        >
          Software
        </Tab>
        <Tab title="Networking">Networking</Tab>
        <Tab title="Settings">Settings</Tab>
      </Tabs>
    </Box>
  );
};
