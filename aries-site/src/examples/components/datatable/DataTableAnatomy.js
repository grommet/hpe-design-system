import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export function DataTableAnatomy() {
  return <Box width="medium" margin={{ bottom: 'medium' }}>
    <AnatomySection
      background="green!"
      gap="xsmall"
      margin={{ bottom: 'small' }}
      pad={{ horizontal: 'small', top: 'xxsmall', bottom: 'xsmall' }}
    >
      <AnatomyLabel>Table controls</AnatomyLabel>
      <Box direction="row" justify="between">
        <Box direction="row" gap="small">
          <AnatomySection background="background-contrast">
            <AnatomyLabel>Search</AnatomyLabel>
          </AnatomySection>
          <AnatomySection background="background-contrast">
            <AnatomyLabel>Filter Controls</AnatomyLabel>
          </AnatomySection>
        </Box>
        <AnatomySection background="background-contrast">
          <AnatomyLabel>Actions</AnatomyLabel>
        </AnatomySection>
      </Box>
    </AnatomySection>
    <AnatomySection background="purple!" margin={{ bottom: 'xxsmall' }}>
      <AnatomyLabel>Table header</AnatomyLabel>
    </AnatomySection>
    <AnatomySection
      background="orange"
      height="small"
      margin={{ bottom: 'xxsmall' }}
    >
      <AnatomyLabel>Table body</AnatomyLabel>
    </AnatomySection>
    <AnatomySection background="blue!">
      <AnatomyLabel>Table footer</AnatomyLabel>
    </AnatomySection>
  </Box>;
}

function AnatomySection({ background, ...rest }) {
  return <Box
    background={background}
    pad={{ horizontal: 'small', vertical: 'xxsmall' }}
    round="xxsmall"
    {...rest}
  />;
}

function AnatomyLabel({ ...rest }) {
  return <Text color="text-strong" size="xsmall" weight="bold" {...rest} />;
}

AnatomySection.propTypes = {
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
