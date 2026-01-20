import React from 'react';
import {
  Box,
  Grid,
  Diagram,
  Menu,
  Stack,
} from 'grommet';
import { Add } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'menu-button',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'menu-label',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'menu-icon',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'first-item',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'menu-item',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '3a',
    toTarget: 'item-label',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '3b',
    toTarget: 'item-icon',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'divider',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['xsmall', '48px']}
    // eslint-disable-next-line max-len
    rows={['auto', '36px', '36px', '56px', '36px', '8px', '36px', '36px', '36px', 'auto']}
    areas={[
      ['annotations-top', 'annotations-top'],
      ['menu-area', 'annotation-1'],
      ['menu-area', 'annotation-2'],
      ['menu-area', 'empty-1'],
      ['menu-area', 'annotation-4'],
      ['menu-area', 'empty-3'],
      ['menu-area', 'empty-4'],
      ['menu-area', 'annotation-3'],
      ['annotations-bottom', 'annotations-bottom'],
    ]}
    gap="xsmall"
    {...rest}
  />
);

export const MenuAnatomy = () => {
  const items = [
    [
      {
        label: <Box id="first-item">Action</Box>,
        onClick: () => {},
      },
      { label: 'Action', onClick: () => {} },
      { label: 'Action', onClick: () => {} },
    ],
    [
      { label: 'Action', onClick: () => {} },
      {
        label: (
          <Box direction="row" gap="small" align="center">
            <Add />
            <Box>Action</Box>
          </Box>
        ),
        onClick: () => {},
      },
      {
        label: (
          <Box direction="row" gap="small" align="center" id="menu-item">
            <Box id="item-label">Action</Box>
            <Add id="item-icon" />
          </Box>
        ),
        onClick: () => {},
      },
    ],
  ];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {/* Annotations on top */}
        <Box 
          gridArea="annotations-top" 
          direction="row" 
          gap="small" 
          justify="start"
          pad={{ bottom: 'small' }}
        >
          <Annotation id="1a" target="1a" />
          <Annotation id="1b" target="1b" />
        </Box>

        {/* Annotations on right side */}
        <Annotation
          id="1"
          target="1"
          gridArea="annotation-1"
          alignSelf="center"
        />
        <Annotation
          id="2"
          target="2"
          gridArea="annotation-2"
          alignSelf="center"
        />
        <Annotation
          id="4"
          target="4"
          gridArea="annotation-4"
          alignSelf="center"
        />
        <Annotation
          id="3"
          target="3"
          gridArea="annotation-3"
          alignSelf="top"
        />

        {/* Annotations below */}
        <Box 
          gridArea="annotations-bottom" 
          direction="row" 
          gap="small" 
          justify="start"
          pad={{ top: 'small' }}
        >
          <Annotation id="3a" target="3a" />
          <Annotation id="3b" target="3b" />
        </Box>

        {/* Empty boxes for grid spacing */}
        <Box gridArea="empty-1" />
        <Box gridArea="empty-2" />
        <Box gridArea="empty-3" />
        <Box gridArea="empty-4" />

        {/* Menu component */}
        <Box
          gridArea="menu-area"
          align="start"
          justify="start"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          onClick={(e) => e.preventDefault()}
        >
          <Menu
            id="menu-button"
            label={
              <Box direction="row" gap="xsmall" align="center">
                <Box id="menu-label">Menu</Box>
                <Box id="menu-icon" />
              </Box>
            }
            items={items}
            open
            tabIndex={-1}
            dropProps={{
              id: 'drop-container',
              onClickOutside: () => {},
              onEsc: () => {},
              style: { pointerEvents: 'none' },
            }}
            messages={{
              openMenu: 'Open Menu',
            }}
          />
          {/* Hidden divider marker for annotation */}
          <Box
            id="divider"
            style={{
              position: 'absolute',
              top: '225px',
              left: '18px',
              width: '120px',
              height: '1px',
              pointerEvents: 'none',
            }}
          />
        </Box>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
