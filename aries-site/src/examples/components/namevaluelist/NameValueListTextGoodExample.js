import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';

const data = {
  name: 'FirstName LastName',
  Username: 'firstname',
  Country: 'United States',
};

export const NameValueListTextGoodExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
