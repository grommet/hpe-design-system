import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';

const data = {
  name: 'FirstName LastName',
  Username: 'firstname',
  Country: 'United States',
};

export const NameValueListTextGoodExample = () => (
  <Box pad="small">
    <NameValueList nameProps={{ width: 'xxsmall' }}>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={<Text size="xsmall">{name}</Text>}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
