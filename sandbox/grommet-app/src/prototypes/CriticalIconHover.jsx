// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Grommet,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe-v8';
import { StatusCritical } from '@hpe-design/icons-grommet';
import primitives from '../../../../packages/hpe-design-tokens/tokens/primitive/primitives.default.json';
import light from '../../../../packages/hpe-design-tokens/tokens/semantic/color.light.json';
import dark from '../../../../packages/hpe-design-tokens/tokens/semantic/color.dark.json';

const resolveColor = (path, semantic) => {
  const source = path.startsWith('base.') ? primitives : semantic;
  const token = path.split('.').reduce((node, key) => node?.[key], source);
  if (!token || typeof token.$value !== 'string')
    throw new Error(`Missing color token: ${path}`);
  const alias = token.$value.match(/^\{(.+)\}$/);
  return alias ? resolveColor(alias[1], semantic) : token.$value;
};

const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => {
      const value = parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return ((values[0] + 0.05) / (values[1] + 0.05)).toFixed(2);
};

const proposedRed850 = '#ad211c';

const modes = [
  {
    mode: 'light',
    source: light,
    restingAlias: 'base.color.red.800',
    hoverAlias: 'base.color.red.850 (proposed)',
    hoverValue: proposedRed850,
    rationale:
      'Proposed red.850 adds a gentler darkening from red.800, retaining a clear red appearance without the deep maroon jump to red.1000. This new primitive still needs design approval.',
  },
  {
    mode: 'dark',
    source: dark,
    restingAlias: 'base.color.red.500',
    hoverAlias: 'base.color.red.400',
    hoverValue: resolveColor('base.color.red.400', dark),
    rationale:
      'A brighter red increases emphasis on the dark surface. Red.400 is the next available lighter primitive after red.500.',
  },
];

const previewTheme = deepMerge(hpe, {
  global: {
    colors: {
      'background-default': {
        light: resolveColor('color.background.default.REST', light),
        dark: resolveColor('color.background.default.REST', dark),
      },
      'icon-critical': {
        light: resolveColor('color.icon.critical.DEFAULT.REST', light),
        dark: resolveColor('color.icon.critical.DEFAULT.REST', dark),
      },
      'icon-critical-hover': {
        light: proposedRed850,
        dark: resolveColor('base.color.red.400', dark),
      },
    },
  },
});

const ModeExample = ({ settings }) => {
  const { mode, source, restingAlias, hoverAlias, hoverValue, rationale } = settings;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [held, setHeld] = useState(false);
  const showingHover = hovered || focused || held;
  const background = resolveColor('color.background.default.REST', source);
  const resting = resolveColor('color.icon.critical.DEFAULT.REST', source);
  const hover = hoverValue;
  const current = showingHover ? hover : resting;

  return (
    <Grommet theme={previewTheme} themeMode={mode}>
      <Box
        as="section"
        aria-label={`${mode} mode example`}
        background="background-default"
        pad="large"
        gap="medium"
        round="small"
        border={{ color: 'border-weak' }}
        data-mode={mode}
      >
        <Box gap="xsmall">
          <Heading level={2} margin="none">
            {mode === 'light' ? 'Light mode' : 'Dark mode'}
          </Heading>
          <Text color="text-weak" size="small">
            background-default / {background}
          </Text>
        </Box>
        <Box align="center" justify="center" gap="small" pad="large">
          <Button
            plain
            a11yTitle={`Hold critical icon hover in ${mode} mode`}
            aria-pressed={held}
            onClick={() => setHeld(!held)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            data-critical-preview={mode}
          >
            <Box pad="small" align="center" justify="center" round="xsmall">
              <StatusCritical
                size="large"
                color={showingHover ? 'icon-critical-hover' : 'icon-critical'}
                aria-hidden="true"
              />
            </Box>
          </Button>
          <Text weight="bold">Critical status</Text>
          <Text size="small" color="text-weak" data-preview-state={mode}>
            {showingHover ? 'Hover preview' : 'Resting state'} / {current}
          </Text>
        </Box>
        <CheckBox
          label="Hold hover"
          checked={held}
          onChange={(event) => setHeld(event.target.checked)}
        />
        <Box gap="small" border={{ side: 'top', color: 'border-weak' }} pad={{ top: 'medium' }}>
          <Text size="small">Rest: {restingAlias} / {resting}</Text>
          <Text size="small" weight="bold">Hover: {hoverAlias} / {hover}</Text>
          <Text size="small" data-contrast={mode}>
            Contrast on background: {contrast(resting, background)}:1 rest /{' '}
            {contrast(hover, background)}:1 hover
          </Text>
          <Paragraph size="small" color="text-weak" margin="none">
            {rationale}
          </Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

ModeExample.propTypes = {
  settings: PropTypes.shape({
    mode: PropTypes.oneOf(['light', 'dark']).isRequired,
    source: PropTypes.object.isRequired,
    restingAlias: PropTypes.string.isRequired,
    hoverAlias: PropTypes.string.isRequired,
    hoverValue: PropTypes.string.isRequired,
    rationale: PropTypes.string.isRequired,
  }).isRequired,
};

const Comparison = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box direction={['xsmall', 'small'].includes(size) ? 'column' : 'row'} gap="medium">
      {modes.map((settings) => (
        <Box key={settings.mode} flex basis="1/2" minWidth="0">
          <ModeExample settings={settings} />
        </Box>
      ))}
    </Box>
  );
};

export const CriticalIconHover = () => (
  <Grommet theme={previewTheme} themeMode="light" full="min">
    <Page background="background-back">
      <PageContent background="background-front">
        <PageHeader
          title="Critical icon hover"
          subtitle="Proposed light- and dark-mode values for color.icon.critical.DEFAULT.hover"
        />
        <Box gap="large" pad={{ bottom: 'large' }}>
          <Paragraph margin="none" fill>
            Hover or focus each critical icon to preview the color change. Click the icon
            or select Hold hover to keep the proposal visible. Both containers use their
            scoped background-default token.
          </Paragraph>
          <Comparison />
          <Text size="small" color="text-weak">
            Proposal only: no source tokens have been changed. Contrast values compare
            the icon with its background (3:1 minimum for meaningful non-text graphics);
            they do not measure how distinguishable the resting and hover states are.
          </Text>
        </Box>
      </PageContent>
    </Page>
  </Grommet>
);
