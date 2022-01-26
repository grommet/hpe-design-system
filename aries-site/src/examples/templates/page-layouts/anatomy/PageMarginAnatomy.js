import React from 'react';
import { Box, Grid, Stack, Text } from 'grommet';
import PropTypes from 'prop-types';

// values chosen to best visually represent the margin area in diagram
const largeColumns = ['13px', 'auto', '13px'];
const smallColumns = ['8px', 'auto', '8px'];

const MarginText = ({ label }) => (
  <Stack anchor="bottom">
    <Text alignSelf="center">{label}</Text>
    {/* values chosen to best visually represent horizontal line in diagram. */}
    <Box width="12px" height="1px" background="black" />
  </Stack>
);

const GridViewPort = ({ columns, label }) => (
  <Grid
    columns={columns}
    // values chosen to best visually represent the margin area in diagram
    rows={['20px', 'small', '20px']}
    areas={[
      ['left-margin', 'top-gap', 'right-margin'],
      ['left-margin', 'viewpoint', 'right-margin'],
      ['left-margin', 'bottom-gap', 'right-margin'],
    ]}
    border={{ style: 'dashed' }}
    // border radius needed to match figma had to use in style
    style={{ borderRadius: '4px' }}
  >
    <Box gridArea="top-gap" background="background-front" />
    <Box
      id="leftMargin"
      gridArea="left-margin"
      background="validation-critical"
    />
    <Box
      id="rightMargin"
      gridArea="right-margin"
      background="validation-critical"
    />
    <Box
      gridArea="viewpoint"
      align="center"
      justify="center"
      round="xsmall"
      background="status-unknown"
      border={{ style: 'dashed' }}
    >
      <Text color="text-strong" weight="bold">
        {label}
      </Text>
    </Box>
    <Box gridArea="bottom-gap" background="background-front" />
  </Grid>
);

const LargeViewPoint = () => (
  <Box gap="small" width="medium">
    <Box direction="row" justify="between">
      <MarginText label="48" />
      <MarginText label="48" />
    </Box>
    <GridViewPort columns={largeColumns} label="Large viewport" />
  </Box>
);

const SmallViewPoint = () => (
  <Box gap="small" width="small">
    <Box direction="row" justify="between">
      <MarginText label="24" />
      <MarginText label="24" />
    </Box>
    <GridViewPort columns={smallColumns} label="Small viewport" />
  </Box>
);

export const PageMarginAnatomy = () => (
  <Box gap="large" direction="row">
    <LargeViewPoint />
    <SmallViewPoint />
  </Box>
);

MarginText.propTypes = {
  label: PropTypes.string,
};

GridViewPort.propTypes = {
  label: PropTypes.string,
  columns: PropTypes.array,
};
