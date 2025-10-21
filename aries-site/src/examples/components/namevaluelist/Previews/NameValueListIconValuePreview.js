import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusGood, StatusWarning } from '@hpe-design/icons-grommet';
import { iconValueData } from '../data';

export const NameValueListIconValuePreview = () => (
  <Box pad="xsmall">
    <NameValueList nameProps={{ width: '3xsmall' }}>
      {Object.entries(iconValueData).map(([name, value]) => {
        let icon;
        if (value === 'Ok')
          icon = <StatusGood aria-hidden="true" color="green" size="small" />;
        else if (value === 'Warning')
          icon = (
            <StatusWarning
              aria-hidden="true"
              color="status-warning"
              size="small"
            />
          );
        return (
          <NameValuePair key={name} name={name}>
            <Box align="center" direction="row" gap="3xsmall">
              {icon}
              <Text color="text-strong">{value}</Text>
            </Box>
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
