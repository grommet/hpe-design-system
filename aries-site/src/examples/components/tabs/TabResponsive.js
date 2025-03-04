import React from 'react';
import { Tab, Tabs, Paragraph } from 'grommet';
import { TabContent } from './TabContent';

export const TabResponsiveExample = () => (
  <Tabs justify="start">
    <Tab title="General">
      <TabContent>
        <Paragraph>General Information</Paragraph>
      </TabContent>
    </Tab>
    <Tab title="Account">
      <TabContent>
        <Paragraph>Account Information</Paragraph>
      </TabContent>
    </Tab>
    <Tab title="Billing">
      <TabContent>
        <Paragraph>Billing Information</Paragraph>
      </TabContent>
    </Tab>
    <Tab title="Overview">
      <TabContent>
        <Paragraph>Overview Information</Paragraph>
      </TabContent>
    </Tab>
    <Tab title="Services">
      <TabContent>
        <Paragraph>Service Information</Paragraph>
      </TabContent>
    </Tab>
    <Tab title="Management">
      <TabContent>
        <Paragraph>Management Information</Paragraph>
      </TabContent>
    </Tab>
  </Tabs>
);
