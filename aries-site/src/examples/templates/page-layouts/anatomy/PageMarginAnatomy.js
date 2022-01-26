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

const GridViewPort = ({ columns, label, marginLabel, width }) => (
  <Box gap="small" width={width}>
    <Box direction="row" justify="between">
      <MarginText label={marginLabel} />
      <MarginText label={marginLabel} />
    </Box>
    <Grid
      columns={columns}
      // values chosen to best visually represent the margin area in diagram
      rows={['20px', 'small', '20px']}
      areas={[
        ['left-margin', 'top-gap', 'right-margin'],
        ['left-margin', 'viewport', 'right-margin'],
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
        gridArea="viewport"
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
  </Box>
);

export const PageMarginAnatomy = () => (
  <Box gap="large" direction="row-responsive">
    <GridViewPort
      columns={largeColumns}
      label="Large viewport"
      marginLabel="48"
      width="medium"
    />
    <GridViewPort
      columns={smallColumns}
      label="Small viewport"
      marginLabel="24"
      width="small"
    />
  </Box>
);

MarginText.propTypes = {
  label: PropTypes.string,
};

GridViewPort.propTypes = {
  label: PropTypes.string,
  columns: PropTypes.array,
  marginLabel: PropTypes.string,
  width: PropTypes.string,
};
