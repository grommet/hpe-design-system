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
    columns = ['36px', 'flex'];
    rows = [
      '48px',
      '24px',
      '37px',
      '25px',
      '24px',
      'xsmall',
      'xsmall',
      '24px',
      '74px',
      '24px',
      '48px',
    ];
    areas = [
      ['empty-0', 'annotation-pad'],
      ['empty-0', 'layer'],
      ['annotation-1a', 'layer'],
      ['annotation-1b', 'layer'],
      ['gap-1', 'layer'],
      ['annotation-2', 'layer'],
      ['annotation-gap', 'layer'],
      ['gap-2', 'layer'],
      ['annotation-3', 'layer'],
      ['annotation-round', 'layer'],
      ['empty-2', 'layer'],
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
          target={mobile ? '6' : 'round="xxsmall"'}
          gridArea="annotation-round"
        />
        <PopoverContent gridArea="popover" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

const PopoverContent = ({ ...rest }) => (
  <Box
    id="popover-container"
    alignSelf="start"
    round="xxsmall"
    elevation="medium"
    {...rest}
  >
    <Box gap="small" direction="row">
      <Box fill pad={{ top: 'small', left: 'small' }}>
        <Box id="popover-title" border={{ style: 'dashed' }}>
          <Text>Title</Text>
        </Box>
        <Box pad="small" id="first-gap" />
        <Box id="popover-body" border={{ style: 'dashed' }} height="xxsmall">
          Body
        </Box>
        <Box pad="small" id="popover-gap" />
        <Box id="popover-footer" border={{ style: 'dashed' }}>
          Footer
        </Box>
        <Box pad="xsmall" />
      </Box>
      <Box pad={{ top: '10px', right: '4px' }}>
        <Box
          border={{ style: 'dashed' }}
          alignSelf="start"
          pad={{ right: 'xxsmall', bottom: '4px' }}
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
        <Box pad="xsmall" id="bottom-pad" />
      </Box>
    </Box>
  </Box>
);
