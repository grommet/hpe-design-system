import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Grid, Box, Text, GridExtendedProps, BoxExtendedProps } from 'grommet';
import {
  fillArg,
  gapArg,
  heightArg,
  justifyArg,
  justifyContentArg,
  marginArg,
  padArg,
  widthArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    columns: {
      control: { type: 'object' },
    },
    fill: fillArg,
    gap: gapArg,
    height: heightArg,
    justify: justifyArg,
    justifyContent: justifyContentArg,
    margin: marginArg,
    pad: padArg,
    rows: {
      control: { type: 'object' },
    },
    width: widthArg,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children, ...props }: BoxExtendedProps) => (
  <Box background="background-contrast" pad="small" round="small" {...props}>
    <Text>{children}</Text>
  </Box>
);

export const BasicGrid: Story = {
  render: (args: any) => (
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

export const WithAreas: Story = {
  render: (args: GridExtendedProps) => (
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
