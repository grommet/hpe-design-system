import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';

export const NameValueListSummaryExample = () => (
  <Card width="medium">
    <CardHeader gap="none" align="start" direction="column">
      <Text>Catalog Lifecyle Manager</Text>
      <Text size="xxlarge" color="text-strong" weight="bold">
        Orders
      </Text>
    </CardHeader>
    <CardBody>
      <NameValueList>
        <NameValuePair name="Total Orders">114</NameValuePair>
        <NameValuePair name="Active">90</NameValuePair>
        <NameValuePair name="In Progress">24</NameValuePair>
      </NameValueList>
    </CardBody>
  </Card>
);
