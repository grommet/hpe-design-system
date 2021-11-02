import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusGood, InProgress } from 'grommet-icons';
import { iconNameData } from '../data';

export const NameValueListIconNamePreview = () => (
  <Box pad="small">
    <NameValueList nameProps={{ width: 'xsmall' }}>
      {Object.entries(iconNameData).map(([name, value]) => {
        let icon;
        if (name === 'Active') icon = <StatusGood size="small" />;
        else if (name === 'In Progress') icon = <InProgress size="small" />;
        return (
          <NameValuePair
            key={name}
            name={
              <Box align="center" direction="row" gap="xsmall">
                {icon}
                <Text color="text-strong">{name}</Text>
              </Box>
            }
          >
            {value}
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
