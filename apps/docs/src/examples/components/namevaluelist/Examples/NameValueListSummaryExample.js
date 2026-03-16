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
      {/* adjust level according to the correct 
      semantic heading level for your layout */}
      <Heading margin="none" level={3}>
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
