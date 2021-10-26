import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';

const data = {
  Power: 'Ok',
  Health: 'Critical',
  'Last Serviced': '7/14/2021',
};

export const NameValueListDefaultExample = () => (
  <Box pad="small">
    <NameValueList nameProps={{ width: 'xsmall' }}>
      {Object.entries(data).map(([name, value]) => {
        let icon;
        if (value === 'Ok')
          icon = <StatusGoodSmall color="green" size="small" />;
        else if (value === 'Critical')
          icon = <StatusCriticalSmall color="red" size="small" />;
        return (
          <NameValuePair key={name} name={name}>
            <Box align="center" direction="row" gap="xsmall">
              {icon}
              <Text color="text-strong">{value}</Text>
            </Box>
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
