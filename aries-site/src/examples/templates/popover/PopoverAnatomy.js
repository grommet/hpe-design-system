import React, { useContext } from 'react';
import {
  Box,
  Button,
  Diagram,
  Grid,
  Stack,
  Text,
  ResponsiveContext,
} from 'grommet';
import { Close } from 'grommet-icons/icons/Close';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1', 'popover-title'),
  connection('2', 'popover-close'),
  connection('3', 'popover-body'),
  connection('4', 'popover-footer'),
  connection('pad', 'popover-container', 'vertical'),
  connection('elevation', 'popover-container', 'vertical'),
  connection('gap', 'first-gap', 'horizontal', 'rectilinear'),
  connection('gap', 'popover-gap', 'horizontal', 'rectilinear'),
  connection('round', 'bottom-pad'),
];

export const PopoverAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  const mobile = !['large', 'xlarge'].includes(breakpoint);
  let columns = ['24px', 'medium', 'auto'];
  let rows = ['48px', '40px', '90px', '60px', '12px', '24px'];

  let areas = [
    ['empty-0', 'annotation-pad', 'empty'],
    ['annotation-1', 'popover', 'annotation-2'],
    ['annotation-3', 'popover', 'annotation-gap'],
    ['annotation-4', 'popover', 'empty-4'],
    ['empty-2', 'popover', 'annotation-round'],
    ['empty-2', 'annotation-elevation', 'empty-5'],
  ];

  if (['xsmall', 'small'].includes(breakpoint)) {
    columns = ['36px', 'flex', '24px'];
    rows = ['32px', '35px', '32px', '48px', '55px', '24px', '24px'];
    areas = [
      ['empty-1', 'annotation-pad'],
      ['empty', 'annotation-2'],
      ['annotation-1', 'popover'],
      ['annotation-3', 'popover'],
      ['annotation-4', 'popover'],
      ['annotation-gap', 'popover'],
      ['empty-2', 'annotation-round'],
      ['empty-2', 'annotation-elevation'],
    ];
  }
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
          id="2"
          target="2"
          gridArea="annotation-2"
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
        <Box align="center" gridArea="annotation-pad" width="100%">
          <Annotation
            id="pad"
            kind="style"
            target={mobile ? '4' : 'pad="small"'}
          />
        </Box>
        <Annotation
          kind="style"
          alignSelf="center"
          id="gap"
          target={mobile ? '5' : 'gap="small"'}
          gridArea="annotation-gap"
        />
        <Box align="center" gridArea="annotation-elevation" width="100%">
          <Annotation
            id="elevation"
            kind="style"
            target={mobile ? '7' : 'elevation="medium"'}
          />
        </Box>
        <Annotation
          alignSelf="center"
          id="round"
          kind="style"
          target={mobile ? '6' : 'round="xsmall"'}
          gridArea="annotation-round"
        />
        <PopoverContent gridArea="popover" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

const PopoverContent = ({ ...rest }) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box
      id="popover-container"
      alignSelf="start"
      background="background-front"
      round="xxsmall"
      elevation="medium"
      {...rest}
    >
      <Box gap="xsmall" direction="row">
        <Box fill pad={{ top: 'xsmall', left: 'xsmall' }}>
          <Box id="popover-title" border={{ style: 'dashed' }}>
            <Text>Title</Text>
          </Box>
          <Box pad="xsmall" id="first-gap" />
          <Box id="popover-body" border={{ style: 'dashed' }} height="5xsmall">
            Body
          </Box>
          <Box pad="xsmall" id="popover-gap" />
          <Box id="popover-footer" border={{ style: 'dashed' }}>
            Footer
          </Box>
          <Box pad="3xsmall" />
        </Box>
        <Box
          pad={
            ['xsmall', 'small'].includes(breakpoint)
              ? { top: '6px', right: '4px' }
              : { top: '10px', right: '4px' }
          }
        >
          <Box
            border={{ style: 'dashed' }}
            alignSelf="start"
            pad={{ right: '5xsmall', bottom: '4px' }}
            id="popover-close"
          >
            <Button
              a11yTitle="close button"
              icon={<Close size="small" />}
              size="small"
              fill
            />
          </Box>
          <Box fill />
          <Box pad="3xsmall" id="bottom-pad" />
        </Box>
      </Box>
    </Box>
  );
};
