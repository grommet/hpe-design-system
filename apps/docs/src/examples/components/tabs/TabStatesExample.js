import React, { useState } from 'react';
import { Tab, Tabs } from 'grommet';
import { TabContent } from './TabContent';

export const TabStatesExample = () => {
  const [index, setIndex] = useState(0);
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Tabs activeIndex={index} onActive={onActive} justify="start">
      <Tab title={index === 0 ? 'Active' : 'Enabled'}>
        <TabContent>The first tab is active.</TabContent>
      </Tab>
      <Tab title={index === 1 ? 'Active' : 'Enabled'}>
        <TabContent>The second tab is active.</TabContent>
      </Tab>
      <Tab title={index === 2 ? 'Active' : 'Enabled'}>
        <TabContent>The third tab is active.</TabContent>
      </Tab>
    </Tabs>
  );
};
