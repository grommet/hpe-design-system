import React, { useContext } from 'react';
import { Box, Grid, Text, ThemeContext } from 'grommet';
import PropTypes from 'prop-types';

const MarginText = ({ label }) => (
  <Box border="bottom">
    <Text alignSelf="center">{label}</Text>
  </Box>
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

export const PageMarginAnatomy = () => {
  const theme = useContext(ThemeContext);
  // values chosen to best visually represent the margin area in diagram
  const largeColumns = [theme.edgeSize.medium, 'auto', theme.edgeSize.medium];
  const smallColumns = [theme.edgeSize.small, 'auto', theme.edgeSize.small];
  return (
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
};

MarginText.propTypes = {
  label: PropTypes.string,
};

GridViewPort.propTypes = {
  label: PropTypes.string,
  columns: PropTypes.array,
  marginLabel: PropTypes.string,
  width: PropTypes.string,
};
