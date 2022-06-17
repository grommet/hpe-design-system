import React from 'react';
import { Tab, Tabs, Paragraph } from 'grommet';

export const TabResponsiveExample = () => (
  <Tabs justify="start">
    <Tab title="General">
      <Paragraph>General Information</Paragraph>
    </Tab>
    <Tab title="Account">
      <Paragraph>Account Information</Paragraph>
    </Tab>
    <Tab title="Billing">
      <Paragraph>Billing Information</Paragraph>
    </Tab>
    <Tab title="Overview">
      <Paragraph>Overview Information</Paragraph>
    </Tab>
    <Tab title="Services">
      <Paragraph>Service Information</Paragraph>
    </Tab>
    <Tab title="Management">
      <Paragraph>Management Information</Paragraph>
    </Tab>
  </Tabs>
);
