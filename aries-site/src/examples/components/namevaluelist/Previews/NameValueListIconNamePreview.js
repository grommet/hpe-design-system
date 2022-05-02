import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusGood, InProgress } from 'grommet-icons';
import { iconNameData } from '../data';

export function NameValueListIconNamePreview() {
  return <Box pad="small">
    <NameValueList>
      {Object.entries(iconNameData).map(([name, value]) => {
        let icon;
        if (name === 'Active')
          icon = <StatusGood aria-hidden="true" size="small" />;
        else if (name === 'In Progress')
          icon = <InProgress aria-hidden="true" size="small" />;
        return (
          <NameValuePair
            key={name}
            name={
              <Box align="center" direction="row" gap="xsmall">
                {icon}
                <Text weight="bold">{name}</Text>
              </Box>
            }
          >
            {value}
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>;
}
