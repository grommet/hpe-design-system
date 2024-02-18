'use client';

import { Box, Button, List, Text } from 'grommet';
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

export const ResourcesList = ({ ...rest }) => (
  <List
    a11yTitle="Resources list"
    border={{ side: 'top', color: 'border-weak' }}
    defaultItemProps={{ pad: 'none' }}
    {...rest}
  >
    {(resource) => {
      const icon =
        RESOURCE_MAP.name[resource.name.toLowerCase()]?.icon ||
        RESOURCE_MAP.type[resource.type.toLowerCase()]?.icon ||
        (() => null);

      return (
        <Button
          as="a"
          a11yTitle={`Open ${resource.name} in a new tab`}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          hoverIndicator
        >
          <Box
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <Box direction="row" align="center" gap="xsmall">
              {icon({ size: '2rem', 'aria-hidden': 'true' })}
              <Box>
                <Text size="xsmall">{resource.type}</Text>
                <TextEmphasis>{resource.name}</TextEmphasis>
              </Box>
            </Box>
            <ShareRounded aria-hidden="true" size="xlarge" color="brand" />
          </Box>
        </Button>
      );
    }}
  </List>
);
