'use client';

import { Box, List, Text } from 'grommet';
import { Document, Figma, Grommet, ShareRounded } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

const RESOURCE_MAP = {
  name: {
    figma: {
      icon: ({ ...props }) => <Figma color="plain" {...props} />,
    },
    'grommet docs': {
      icon: ({ ...props }) => <Grommet color="#7d4cdb" {...props} />,
    },
  },
  type: {
    documentation: {
      icon: ({ ...props }) => <Document {...props} />,
    },
  },
};

export const ResourcesList = ({ data, ...rest }) => (
  <List
    a11yTitle="Resources list"
    data={data}
    border={{ side: 'top', color: 'border-weak' }}
    onClickItem={({ item, index }) => {
      console.log(item, index);
    }}
    {...rest}
  >
    {resource => {
      const icon =
        RESOURCE_MAP.name[resource.name.toLowerCase()]?.icon ||
        RESOURCE_MAP.type[resource.type.toLowerCase()]?.icon ||
        (() => null);

      return (
        <Box direction="row" align="center" justify="between">
          <Box direction="row" align="center" gap="xsmall">
            {icon({ size: '2rem' })}
            <Box>
              <Text size="xsmall">{resource.type}</Text>
              <TextEmphasis>{resource.name}</TextEmphasis>
            </Box>
          </Box>
          <ShareRounded size="xlarge" color="brand" />
        </Box>
      );
    }}
  </List>
);
