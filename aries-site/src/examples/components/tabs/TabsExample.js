import React, { useState } from 'react';
import { Paragraph, Tab, Tabs } from 'grommet';
import { TabContent } from './TabContent';

export const TabsExample = () => {
  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Tabs activeIndex={index} onActive={onActive} justify="start">
      <Tab title="General">
        <TabContent>
          <Paragraph margin="none">
            Tab content should be flush with the left edge of the Tab. A
            "medium" vertical padding should be applied to create space between
            the Tab and its content.
          </Paragraph>
        </TabContent>
      </Tab>
      <Tab title="Account">
        <TabContent>Account Information</TabContent>
      </Tab>
      <Tab title="Billing">
        <TabContent>Billing Information</TabContent>
      </Tab>
    </Tabs>
  );
};
