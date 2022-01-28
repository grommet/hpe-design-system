import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { cardSummaryData } from '../data';

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
        {Object.entries(cardSummaryData).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            {value}
          </NameValuePair>
        ))}
      </NameValueList>
    </CardBody>
  </Card>
);
