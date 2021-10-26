import React from 'react';
import { Box, Text, Diagram, Stack } from 'grommet';

const color = 'text-strong';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'rectilinear';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'name',
    toTarget: '1',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'nameVisual',
    toTarget: '3',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'value',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'valueVisual',
  },
];

export const NameValueListAnatomy = () => (
  <Stack>
    <Box gap="medium" pad={{ bottom: 'medium' }}>
      <Box gap="large">
        <Box gap="large" direction="row">
          <Box
            id="3"
            align="center"
            pad="small"
            height="xxsmall"
            round="large"
            width="xxsmall"
            background="background-front"
          >
            <Text weight="bold">3</Text>
          </Box>
          <Box
            id="1"
            align="center"
            pad="small"
            height="xxsmall"
            round="large"
            width="xxsmall"
            background="background-front"
          >
            <Text weight="bold">1</Text>
          </Box>
        </Box>
        <Box gap="medium" direction="row">
          <Box direction="row-responsive" gap="medium">
            <Box
              id="nameVisual"
              height="xxsmall"
              width="xxsmall"
              background="status-warning"
            />
            <Box
              id="name"
              height="xxsmall"
              width="small"
              background="status-warning"
            />
          </Box>
          <Box direction="row-responsive" gap="medium">
            <Box
              id="valueVisual"
              height="xxsmall"
              width="xxsmall"
              background="purple!"
            />
            <Box
              id="value"
              height="xxsmall"
              width="small"
              background="purple!"
            />
          </Box>
        </Box>
      </Box>
      <Box justify="end" width="medium" gap="large" direction="row">
        <Box
          id="4"
          align="center"
          pad="small"
          height="xxsmall"
          round="large"
          width="xxsmall"
          background="background-front"
        >
          <Text weight="bold">3</Text>
        </Box>
        <Box
          id="2"
          align="center"
          pad="small"
          height="xxsmall"
          round="large"
          width="xxsmall"
          background="background-front"
        >
          <Text weight="bold">2</Text>
        </Box>
      </Box>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);
