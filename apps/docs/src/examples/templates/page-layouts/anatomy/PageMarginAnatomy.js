import React, { useContext } from 'react';
import { Box, Grid, Text, ThemeContext } from 'grommet';
import PropTypes from 'prop-types';
import { TextEmphasis } from '@shared/aries-core';

const MarginText = ({ label }) => (
  <Box border="bottom">
    <Text alignSelf="center">{label}</Text>
  </Box>
);

const GridViewPort = ({ columns, label, marginLabel, rows, width }) => (
  <Box gap="xsmall" width={width}>
    <Box direction="row" justify="between">
      <MarginText label={marginLabel} />
      <MarginText label={marginLabel} />
    </Box>
    <Grid
      columns={columns}
      // values chosen to best visually represent the margin area in diagram
      rows={rows}
      areas={[
        ['left-margin', 'top-gap', 'right-margin'],
        ['left-margin', 'viewport', 'right-margin'],
        ['left-margin', 'bottom-gap', 'right-margin'],
      ]}
      border={{ style: 'dashed' }}
      // border radius needed to match figma had to use in style
      style={{ borderRadius: 'small' }}
    >
      <Box gridArea="top-gap" background="background-front" />
      <Box gridArea="left-margin" background="validation-critical" />
      <Box gridArea="right-margin" background="validation-critical" />
      <Box
        gridArea="viewport"
        align="center"
        justify="center"
        round="xsmall"
        // TODO: Using opacity weak is a temporary solution until
        // we have a wider range of colors in the theme.
        background={{ color: 'decorative-neutral', opacity: 'weak' }}
        border={{ style: 'dashed' }}
      >
        <TextEmphasis>{label}</TextEmphasis>
      </Box>
      <Box gridArea="bottom-gap" background="background-front" />
    </Grid>
  </Box>
);

export const PageMarginAnatomy = () => {
  const theme = useContext(ThemeContext);
  // values chosen to best visually represent the margin area in diagram
  const RowSizes = [
    theme.global.edgeSize.medium,
    'small',
    theme.global.edgeSize.medium,
  ];
  const largeColumns = [
    theme.global.edgeSize.medium,
    'auto',
    theme.global.edgeSize.medium,
  ];
  const smallColumns = [
    theme.global.edgeSize.xsmall,
    'auto',
    theme.global.edgeSize.xsmall,
  ];
  return (
    <Box gap="xlarge" direction="row-responsive">
      <GridViewPort
        columns={largeColumns}
        rows={RowSizes}
        label="Large viewport"
        marginLabel="48"
        width="medium"
      />
      <GridViewPort
        columns={smallColumns}
        rows={RowSizes}
        label="Small viewport"
        marginLabel="24"
        width="xsmall"
      />
    </Box>
  );
};

MarginText.propTypes = {
  label: PropTypes.string,
};

GridViewPort.propTypes = {
  label: PropTypes.string,
  columns: PropTypes.array,
  marginLabel: PropTypes.string,
  rows: PropTypes.array,
  width: PropTypes.string,
};
