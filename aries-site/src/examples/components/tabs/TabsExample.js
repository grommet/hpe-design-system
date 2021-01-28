import React from 'react';
import { Box, Tab, Tabs, ThemeContext } from 'grommet';

export const TabsExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Box gap="medium">
      <Box>
        <Tabs activeIndex={index} onActive={onActive} justify="start">
          <Tab title="General">
            <Box margin="small" gap="small">
              User Information
            </Box>
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
        </Tabs>
      </Box>
      <ThemeContext.Extend
        value={{
          tab: {
            active: {
              color: 'text-strong',
            },
            border: {
              side: 'bottom',
              size: 'medium',
              color: 'transparent',
              active: {
                color: 'border-strong',
                width: 'large',
              },
              disabled: {
                color: 'transparent',
              },
              hover: {
                color: 'transparent',
              },
            },
          },
        }}
      >
        <Box>
          <Tabs activeIndex={index} onActive={onActive} justify="start">
            <Tab title="General">
              <Box margin="small" gap="small">
                User Information
              </Box>
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
          </Tabs>
        </Box>
      </ThemeContext.Extend>
    </Box>
  );
};
