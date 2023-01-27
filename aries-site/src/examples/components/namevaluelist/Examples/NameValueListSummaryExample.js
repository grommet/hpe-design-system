import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { cardSummaryData } from '../data';

export const NameValueListSummaryExample = () => (
  <Card width="medium">
    <CardHeader gap="none" align="start" direction="column">
      <Text>Catalog Lifecyle Manager</Text>
      <Heading level={2} margin="none">
        Orders
      </Heading>
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
