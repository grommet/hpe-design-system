import React from 'react';
import { Box, Button, Diagram, Grid, Stack, Text } from 'grommet';
import { Close } from 'grommet-icons';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1', 'popover-title'),
  connection('2', 'popover-close'),
  connection('3', 'popover-body'),
  connection('4', 'popover-footer'),
];

export const PopoverAnatomy = () => {
  const columns = ['36px', 'medium', 'auto'];
  const rows = ['80px', '110px', '80px', '12px'];

  const areas = [
    ['annotation-1', 'popover', 'annotation-2'],
    ['annotation-3', 'popover', 'annotation-gap'],
    ['annotation-4', 'popover', 'empty-4'],
    ['empty', 'popover', 'empty-4'],
  ];

  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={{ column: 'medium' }}
      >
        <Annotation
          alignSelf="center"
          id="1"
          target="1"
          gridArea="annotation-1"
        />
        <Annotation
          alignSelf="center"
          id="3"
          target="3"
          gridArea="annotation-3"
        />
        <Annotation
          alignSelf="center"
          id="4"
          target="4"
          gridArea="annotation-4"
        />
        <Annotation
          alignSelf="center"
          id="2"
          target="2"
          gridArea="annotation-2"
        />
        <PopoverContent gridArea="popover" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

const PopoverContent = ({ ...rest }) => (
  <Box
    id="layer-container"
    alignSelf="start"
    round="xxsmall"
    elevation="medium"
    {...rest}
  >
    <Box pad={{ top: 'medium', horizontal: 'medium' }}>
      <Box
        direction="row"
        justify="between"
        align="center"
        border={{ style: 'dashed' }}
      >
        <Text id="popover-title">Title</Text>
        <Button
          id="popover-close"
          a11yTitle="close button"
          icon={<Close size="small" />}
        />
      </Box>
      <Box pad="small" />
      <Box
        id="popover-body"
        border={{ style: 'dashed' }}
        height="xsmall"
        align="center"
        justify="center"
      >
        Body
      </Box>
      <Box pad="small" />
      <Box
        id="popover-footer"
        border={{ style: 'dashed' }}
        justify="center"
        flex={false}
        pad="medium"
        height="xxsmall"
      >
        Footer
      </Box>
      <Box pad="small" id="bottom-pad" />
    </Box>
  </Box>
);
