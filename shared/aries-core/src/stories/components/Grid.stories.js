import React from 'react';
import { Grid, Box, Text } from 'grommet';
import {
  spacingSizes,
  containerSizes,
  fillArg,
  gapArg,
  heightArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    alignContent: {
      control: { type: 'select' },
      options: [
        'start',
        'center',
        'end',
        'between',
        'around',
        'evenly',
        'stretch',
      ],
    },
    columns: {
      control: { type: 'object' },
    },
    fill: fillArg,
    gap: gapArg,
    height: heightArg,
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
    justifyContent: {
      control: { type: 'select' },
      options: [
        'start',
        'center',
        'end',
        'between',
        'around',
        'evenly',
        'stretch',
      ],
    },
    margin: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    pad: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    rows: {
      control: { type: 'object' },
    },
    width: {
      control: { type: 'select' },
      options: containerSizes,
    },
  },
};

export default meta;

const GridItem = ({ children, ...props }) => (
  <Box background="background-contrast" pad="small" round="small" {...props}>
    <Text>{children}</Text>
  </Box>
);

export const BasicGrid = {
  render: args => (
    <Grid {...args}>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </Grid>
  ),
  args: {
    columns: ['auto', 'auto'],
    gap: 'small',
  },
  name: 'Grid',
};

// export const ResponsiveColumns = {
//   render: args => (
//     <Grid {...args}>
//       <GridItem>Responsive 1</GridItem>
//       <GridItem>Responsive 2</GridItem>
//       <GridItem>Responsive 3</GridItem>
//       <GridItem>Responsive 4</GridItem>
//     </Grid>
//   ),
//   args: {
//     columns: {
//       xsmall: ['auto'],
//       small: ['auto', 'auto'],
//       medium: ['auto', 'auto', 'auto'],
//       large: ['auto', 'auto', 'auto', 'auto'],
//     },
//     gap: 'medium',
//   },
//   name: 'Responsive Columns',
// };

export const FlexibleSizing = {
  render: args => (
    <Grid {...args}>
      <GridItem>1/3 width</GridItem>
      <GridItem>2/3 width</GridItem>
    </Grid>
  ),
  args: {
    columns: ['1/3', '2/3'],
    gap: 'medium',
    height: 'medium',
  },
  name: 'Flexible Sizing',
};

export const WithAreas = {
  render: args => (
    <Grid {...args}>
      <GridItem gridArea="header">Header</GridItem>
      <GridItem gridArea="sidebar">Sidebar</GridItem>
      <GridItem gridArea="main">Main Content</GridItem>
      <GridItem gridArea="footer">Footer</GridItem>
    </Grid>
  ),
  args: {
    areas: [
      ['header', 'header'],
      ['sidebar', 'main'],
      ['footer', 'footer'],
    ],
    columns: ['medium', 'flex'],
    rows: ['auto', 'flex', 'auto'],
    gap: 'small',
    height: 'medium',
  },
  name: 'With Areas',
};
