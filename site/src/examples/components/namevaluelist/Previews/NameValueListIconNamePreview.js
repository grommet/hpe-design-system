import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { StatusGood, InProgress } from 'grommet-icons';
import { TextEmphasis } from 'library';
import { iconNameData } from '../data';

export const NameValueListIconNamePreview = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(iconNameData).map(([name, value]) => {
        let icon;
        if (name === 'Active')
          icon = <StatusGood aria-hidden="true" size="small" />;
        else if (name === 'In progress')
          icon = <InProgress aria-hidden="true" size="small" />;
        return (
          <NameValuePair
            key={name}
            name={
              <Box align="center" direction="row" gap="xsmall">
                {icon}
                <TextEmphasis>{name}</TextEmphasis>
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
