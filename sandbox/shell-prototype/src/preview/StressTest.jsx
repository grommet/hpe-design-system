// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph, Text, ThemeContext } from 'grommet';
import { useSurfaceVariant } from '../surfaces';
import { stepName } from '../layouts/steps';

const MONO = { fontFamily: 'ui-monospace, Menlo, monospace' };

// Tokens the selected architecture paints with, and their values in the
// current mode and page theme.
const TokenLegend = () => {
  const theme = useContext(ThemeContext);
  const { tokens, mode } = useSurfaceVariant();
  return (
    <Box direction="row" gap="medium" wrap flex={false}>
      {[...new Set(Object.values(tokens))].map(token => {
        const color = theme.global.colors[token];
        const value = typeof color === 'string' ? color : color?.[mode];
        return (
          <Box key={token} direction="row" gap="xsmall" align="center">
            {value && (
              <Box
                width="16px"
                height="16px"
                round="full"
                border={{ color: 'border-strong' }}
                background={value}
                flex={false}
              />
            )}
            <Text size="xsmall" style={MONO}>
              {token.replace('background-surface-', '')}
            </Text>
            {value && (
              <Text size="xsmall" style={MONO} color="text-weak">
                {stepName(value)}
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

// One stress-test layout, painted with the selected architecture: what it
// stresses, the layout itself, and what the theme would need beyond the
// surface tokens to serve the design.
export const StressTest = ({ layout }) => (
  <Box fill overflow={{ vertical: 'auto' }}>
    <Box
      flex={false}
      alignSelf="center"
      fill="horizontal"
      width={{ max: '1200px' }}
      pad="medium"
      gap="medium"
    >
      <Box gap="xsmall" flex={false}>
        <Heading level={1} size="small" margin="none">
          {layout.title}
        </Heading>
        <Paragraph margin="none" fill>
          <Text weight={500}>Stresses: </Text>
          {layout.stress}
        </Paragraph>
        <TokenLegend />
      </Box>
      <layout.Component />
      <Box
        border={{ side: 'left', color: 'border-strong', size: 'small' }}
        pad={{ left: 'small' }}
        gap="xsmall"
        flex={false}
      >
        <Text weight={500}>Theme extensions the design would need</Text>
        {layout.extensions.map(item => (
          <Paragraph key={item} margin="none" fill size="small">
            {item}
          </Paragraph>
        ))}
      </Box>
    </Box>
  </Box>
);

StressTest.propTypes = {
  layout: PropTypes.shape({
    title: PropTypes.string.isRequired,
    stress: PropTypes.string.isRequired,
    Component: PropTypes.elementType.isRequired,
    extensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
