import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';

const data = {
  name: 'FirstName LastName',
  Username: 'firstname',
  Country: 'United States',
};

export const NameValueListTextBadExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={<Text size="xxlarge">{name}</Text>}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
