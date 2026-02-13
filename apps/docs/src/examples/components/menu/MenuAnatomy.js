import React, { useContext } from 'react';
import { Box, Grid, Diagram, Stack, ThemeContext } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';
import {
  MockMenuItem,
  MockMenuContainer,
  MockMenuGroup,
  MockMenuButton,
} from './MenuMockComponents';

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
    anchor: 'vertical',
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
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'drop-container',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'menu-item-target',
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
    toTarget: 'divider-target',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', 'max-content', '5xsmall']}
    rows={[
      '5xsmall',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      '5xsmall',
    ]}
    areas={[
      ['annotation-1a', 'annotation-1b', 'empty-0'],
      ['menu-area', 'menu-area', 'annotation-1'],
      ['menu-area', 'menu-area', 'empty-1'],
      ['menu-area', 'menu-area', 'annotation-2'],
      ['menu-area', 'menu-area', 'empty-2'],
      ['menu-area', 'menu-area', 'empty-3'],
      ['menu-area', 'menu-area', 'annotation-4'],
      ['menu-area', 'menu-area', 'empty-4'],
      ['menu-area', 'menu-area', 'empty-5'],
      ['menu-area', 'menu-area', 'annotation-3'],
      ['annotation-3a', 'annotation-3b', 'empty-6'],
    ]}
    align="center"
    justify="center"
    {...rest}
  />
);

export const MenuAnatomy = () => {
  const theme = useContext(ThemeContext);
  const menuTheme = theme?.menu || {};
  const dropTheme = theme?.global.drop || {};

  const annotations = [
    { id: '1', gridArea: 'annotation-1', target: '1' },
    { id: '1a', gridArea: 'annotation-1a', target: '1a' },
    { id: '1b', gridArea: 'annotation-1b', target: '1b' },
    { id: '2', gridArea: 'annotation-2', target: '2' },
    { id: '3', gridArea: 'annotation-3', target: '3' },
    { id: '3a', gridArea: 'annotation-3a', target: '3a' },
    { id: '3b', gridArea: 'annotation-3b', target: '3b' },
    { id: '4', gridArea: 'annotation-4', target: '4' },
  ];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {annotations.map(({ id, gridArea, target, ...rest }) => (
          <Annotation
            key={id}
            id={id}
            target={target}
            gridArea={gridArea}
            {...rest}
          />
        ))}

        {/* Menu anatomy mockup */}
        <Box gridArea="menu-area" align="start">
          {/* Adding bounding box to add dashed outline for clarity */}
          <Box
            border={{ style: 'dashed' }}
            round="small"
            margin={dropTheme.margin}
          >
            <MockMenuButton
              round="small"
              id="menu-button"
              label={<Box id="menu-label">Menu</Box>}
              iconDown={<Box id="menu-icon">{menuTheme.icons?.down}</Box>}
            />
          </Box>
          <MockMenuContainer>
            <MockMenuGroup id="drop-container">
              <MockMenuItem label="Action" />
              <MockMenuItem label="Action" />
              <MockMenuItem label="Action" />
            </MockMenuGroup>
            <MockMenuGroup showDivider dividerProps={{ id: 'divider-target' }}>
              <MockMenuItem label="Action" />
              <MockMenuItem icon={<Add />} label="Action" />
              <Box border={{ style: 'dashed' }} round="small">
                <MockMenuItem
                  id="menu-item-target"
                  label={<Box id="item-label">Action</Box>}
                  icon={<Add id="item-icon" />}
                  reverse
                />
              </Box>
            </MockMenuGroup>
          </MockMenuContainer>
        </Box>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
