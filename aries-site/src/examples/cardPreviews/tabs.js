import React from 'react';
import { Tabs, Tab } from 'grommet';

export function TabsPreview() {
  return <Tabs>
      <Tab title="Tab 1" tabIndex={-1} />
      <Tab title="Tab 2" tabIndex={-1} />
      <Tab title="Tab 3" tabIndex={-1} />
    </Tabs>;
}
