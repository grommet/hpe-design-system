import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const DataTableAnatomy = () => (
  <Box width="medium" margin={{ bottom: 'medium' }}>
    <AnatomySection
      background="background-primary-xstrong"
      gap="3xsmall"
      margin={{ bottom: 'xsmall' }}
      pad={{ horizontal: 'xsmall', top: '5xsmall', bottom: '3xsmall' }}
    >
      <AnatomyLabel>Table controls</AnatomyLabel>
      <Box direction="row" justify="between">
        <Box direction="row" gap="xsmall">
          <AnatomySection background="background-contrast">
            <AnatomyLabel>Search</AnatomyLabel>
          </AnatomySection>
          <AnatomySection background="background-contrast">
            <AnatomyLabel>Filter controls</AnatomyLabel>
          </AnatomySection>
        </Box>
        <AnatomySection background="background-contrast">
          <AnatomyLabel>Actions</AnatomyLabel>
        </AnatomySection>
      </Box>
    </AnatomySection>
    <AnatomySection
      // TODO: Using opacity weak is a temporary solution until
      // we have a wider range of colors in the theme.
      background={{ color: 'decorative-purple', opacity: 'weak' }}
      margin={{ bottom: '5xsmall' }}
    >
      <AnatomyLabel>Table header</AnatomyLabel>
    </AnatomySection>
    <AnatomySection
      // TODO: Using opacity weak is a temporary solution until
      // we have a wider range of colors in the theme.
      background={{ color: 'decorative-blue', opacity: 'weak' }}
      height="xsmall"
      margin={{ bottom: '5xsmall' }}
    >
      <AnatomyLabel>Table body</AnatomyLabel>
    </AnatomySection>
    <AnatomySection background="blue!">
      <AnatomyLabel>Table footer</AnatomyLabel>
    </AnatomySection>
  </Box>
);

const AnatomySection = ({ background, ...rest }) => (
  <Box
    background={background}
    pad={{ horizontal: 'xsmall', vertical: '5xsmall' }}
    round="xxsmall"
    {...rest}
  />
);

const AnatomyLabel = ({ ...rest }) => (
  <Text color="text-strong" size="xsmall" weight="bold" {...rest} />
);

AnatomySection.propTypes = {
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
