// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  NameValueList,
  NameValuePair,
  Paragraph,
  Text,
  ThemeContext,
} from 'grommet';
import { useSurfaceVariant } from '../surfaces';
import { resolveRole, root } from '../layouts/roles';
import { stepName } from '../layouts/steps';

const MONO = { fontFamily: 'ui-monospace, Menlo, monospace' };

// A colour sample. With no `value` it is an empty dashed ring, for a region
// that paints nothing.
const Swatch = ({ value }) => (
  <Box
    width="16px"
    height="16px"
    round="full"
    border={{ color: 'border-strong', style: value ? 'solid' : 'dashed' }}
    background={value}
    flex={false}
  />
);

Swatch.propTypes = { value: PropTypes.string };

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
            {value && <Swatch value={value} />}
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

// What is applied to the layout's top-level regions under the selected
// architecture, starting with the page. A region with no surface is listed
// too, so it is clear that what shows there is the page.
const AppLevel = ({ rows }) => {
  const theme = useContext(ThemeContext);
  const { arch, mode } = useSurfaceVariant();
  const page = resolveRole(arch, root).display;
  return (
    <Box gap="xsmall" flex={false}>
      <Text weight={500}>Applied at the app level</Text>
      <NameValueList
        nameProps={{ width: 'small' }}
        valueProps={{ width: 'xlarge' }}
      >
        {rows.map(({ label, role, note }) => {
          const { token, display } = resolveRole(arch, role);
          const color = token && theme.global.colors[token];
          const value = typeof color === 'string' ? color : color?.[mode];
          return (
            <NameValuePair
              key={label}
              name={
                <Text size="small" weight={500}>
                  {label}
                </Text>
              }
            >
              <Box direction="row" gap="xsmall" align="center" wrap>
                <Swatch value={value} />
                <Text size="small" style={MONO}>
                  {display}
                </Text>
                {role.kind === 'none' && (
                  <Text size="small">
                    shows the page:{' '}
                    <Text size="small" style={MONO}>
                      {page}
                    </Text>
                  </Text>
                )}
                {value && role.kind !== 'fixed' && (
                  <Text size="small" style={MONO} color="text-weak">
                    {stepName(value)}
                  </Text>
                )}
                <Text size="small">{note}</Text>
              </Box>
            </NameValuePair>
          );
        })}
      </NameValueList>
    </Box>
  );
};

AppLevel.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      role: PropTypes.object.isRequired,
      note: PropTypes.string.isRequired,
    }),
  ).isRequired,
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
      <AppLevel rows={layout.appLevel} />
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
    appLevel: AppLevel.propTypes.rows,
    Component: PropTypes.elementType.isRequired,
    extensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
