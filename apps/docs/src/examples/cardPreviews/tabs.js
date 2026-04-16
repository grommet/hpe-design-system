import React from 'react';
import { Tabs, Tab } from 'grommet';
import { useInert } from '@shared/hooks';

export const TabsPreview = () => {
  const ref = useInert();

  return (
    <Tabs ref={ref}>
      <Tab title="Tab 1" />
      <Tab title="Tab 2" />
      <Tab title="Tab 3" />
    </Tabs>
  );
};
