import React, { useState } from 'react';
import { Box, Tabs, Tab, NameValueList, NameValuePair } from 'grommet';

const defaultData = {
  'Operating System': 'VMware ESXi 6.7.0 build-8169922',
  'IP Address': '172.31.47.37',
  Make: 'Dell Inc.',
  Model: 'PowerEdge R630',
  'Serial Number': '5YCXKH2',
};

const TabContent = ({ ...rest }) => (
  <Box pad={{ vertical: 'medium' }} {...rest} />
);

export const ResourceOverview: React.FC = () => {
  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);
  return (
    <Box gap="small">
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="Overview">
          <TabContent>
            <NameValueList
              gap="small"
              nameProps={{ width: ['xsmall', 'max-content'] }}
            >
              {Object.entries(defaultData).map(([name, value]) => {
                return (
                  <NameValuePair key={name} name={name}>
                    {value}
                  </NameValuePair>
                );
              })}
            </NameValueList>
          </TabContent>
        </Tab>
        <Tab title="Related Resources">
          <TabContent>Related Resources Information</TabContent>
        </Tab>
        <Tab title="Custom Atttributes">
          <TabContent>Custom Atttribute Information</TabContent>
        </Tab>
      </Tabs>
    </Box>
  );
};
