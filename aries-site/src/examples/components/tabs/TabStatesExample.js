import React from 'react';
import { Box, Tab, Tabs } from 'grommet';

export const TabStatesExample = () => {
  const [index, setIndex] = React.useState(0);
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box>
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title={index === 0 ? 'Active' : 'Enabled'}>
          <Box margin="small">The first tab is active.</Box>
        </Tab>
        <Tab title={index === 1 ? 'Active' : 'Enabled'}>
          <Box margin="small">The second tab is active.</Box>
        </Tab>
        <Tab title={index === 2 ? 'Active' : 'Enabled'}>
          <Box margin="small">The third tab is active.</Box>
        </Tab>
        <Tab title="Disabled" disabled>
          <Box margin="small">This tab is disabled.</Box>
        </Tab>
      </Tabs>
    </Box>
  );
};
