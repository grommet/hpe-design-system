import React from 'react';
import { Box, Tab, Tabs, Text } from 'grommet';

export const TabStatesExample = () => {
  const [index, setIndex] = React.useState(0);
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box>
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title={index === 0 ? 'Active' : 'Enabled'}>
          <Box margin="small">
            <Text>The first tab is active.</Text>
          </Box>
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
