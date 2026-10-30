// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import { Box, Grommet, Heading, Paragraph, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { light, dark } from 'hpe-design-tokens/grommet';
import { Surface } from '../surfaces/Surface';
import { TOKENS } from '../surfaces/surfaceState';
import { themes, surfaceTokenSets } from '../surfaces/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const Slide = ({ kicker, title, lead, children }) => (
  <Box pad={{ horizontal: 'large', vertical: 'medium' }} gap="medium" flex={false}>
    <Box gap="xsmall">
      {kicker && (
        <Text size="small" color="text-weak" weight={500}>
          {kicker}
        </Text>
      )}
      <Heading level={1} margin="none" size="medium">
        {title}
      </Heading>
      {lead && (
        <Paragraph size="large" margin="none" fill>
          {lead}
        </Paragraph>
      )}
    </Box>
    {children}
  </Box>
);

Slide.propTypes = {
  kicker: PropTypes.string,
  title: PropTypes.string.isRequired,
  lead: PropTypes.node,
  children: PropTypes.node,
};

// Explanatory panel. Carries no surface token on purpose (decision 6: a
// container that should read as the page takes no surface) — the border does
// the separating.
export const Note = ({ title, children, ...rest }) => (
  <Box
    border={{ color: 'border-weak' }}
    round="xsmall"
    pad="small"
    gap="xsmall"
    flex={false}
    {...rest}
  >
    {title && (
      <Text weight={500} size="small">
        {title}
      </Text>
    )}
    {typeof children === 'string' ? (
      <Text size="small">{children}</Text>
    ) : (
      children
    )}
  </Box>
);

Note.propTypes = { title: PropTypes.node, children: PropTypes.node };

// Code uses background-contrast: a standard fill, not a structural surface
// (decision 15a).
export const Code = ({ title, children }) => (
  <Box
    background="background-contrast"
    round="xsmall"
    pad="small"
    gap="xsmall"
    flex={false}
  >
    {title && (
      <Text size="xsmall" color="text-weak">
        {title}
      </Text>
    )}
    <pre
      style={{
        margin: 0,
        fontFamily: MONO,
        fontSize: 12.5,
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
      }}
    >
      {children}
    </pre>
  </Box>
);

Code.propTypes = { title: PropTypes.node, children: PropTypes.node };

export const Mono = ({ children }) => (
  <Text size="small" style={{ fontFamily: MONO }}>
    {children}
  </Text>
);

Mono.propTypes = { children: PropTypes.node };

export const Columns = ({ children, ...rest }) => (
  <Box direction="row" gap="medium" wrap={false} align="start" {...rest}>
    {children}
  </Box>
);

Columns.propTypes = { children: PropTypes.node };

export const Column = ({ children, ...rest }) => (
  <Box flex basis="0" gap="small" {...rest}>
    {children}
  </Box>
);

Column.propTypes = { children: PropTypes.node };

const Swatch = ({ hex }) => (
  <Box direction="row" gap="xsmall" align="center">
    <Box
      width="20px"
      height="20px"
      round="xxsmall"
      background={hex}
      border={{ color: 'border-weak' }}
      flex={false}
    />
    <Mono>{hex}</Mono>
  </Box>
);

Swatch.propTypes = { hex: PropTypes.string.isRequired };

const ROLE_ORDER = ['surface-base', 'surface-tone-1', 'surface-tone-2', 'surface-floating'];

/**
 * The alias chart, read from the built tokens rather than typed in:
 * role → color.surface step → light / dark value.
 */
export const AliasTable = ({ surfaceMode, highlight }) => {
  const refs = surfaceTokenSets[surfaceMode].hpe.color.background;
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto 1fr 1fr',
    gap: '6px 14px',
    alignItems: 'center',
  };
  return (
    <Box style={grid} flex={false}>
      <Text size="xsmall" color="text-weak">
        role
      </Text>
      <span />
      <Text size="xsmall" color="text-weak">
        step
      </Text>
      <Text size="xsmall" color="text-weak" weight={highlight === 'light' ? 700 : 400}>
        light
      </Text>
      <Text size="xsmall" color="text-weak" weight={highlight === 'dark' ? 700 : 400}>
        dark
      </Text>
      {ROLE_ORDER.map(role => {
        const ref = refs[role];
        const step = ref.replace('surface-', '');
        return [
          <Mono key={`${role}-r`}>{role.replace('surface-', 'surface.').replace('tone-', 'tone.')}</Mono>,
          <Text key={`${role}-a`} color="text-weak">
            →
          </Text>,
          <Mono key={`${role}-s`}>{`color.surface.${step}`}</Mono>,
          <Swatch key={`${role}-l`} hex={light.hpe.color.surface[step]} />,
          <Swatch key={`${role}-d`} hex={dark.hpe.color.surface[step]} />,
        ];
      })}
    </Box>
  );
};

AliasTable.propTypes = {
  surfaceMode: PropTypes.oneOf(['default', 'toned']).isRequired,
  highlight: PropTypes.oneOf(['light', 'dark']),
};

/** The reference tier as built: step → light / dark. */
export const ReferenceTable = () => {
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 1fr',
    gap: '6px 14px',
    alignItems: 'center',
  };
  return (
    <Box style={grid} flex={false}>
      <Text size="xsmall" color="text-weak">
        token
      </Text>
      <Text size="xsmall" color="text-weak">
        color.light.json
      </Text>
      <Text size="xsmall" color="text-weak">
        color.dark.json
      </Text>
      {Object.keys(light.hpe.color.surface).map(step => [
        <Mono key={`${step}-t`}>{`color.surface.${step}`}</Mono>,
        <Swatch key={`${step}-l`} hex={light.hpe.color.surface[step]} />,
        <Swatch key={`${step}-d`} hex={dark.hpe.color.surface[step]} />,
      ])}
    </Box>
  );
};

/**
 * A nested Grommet with its own surface theme and colour mode, so two
 * variants can be rendered side by side regardless of the deck's switches.
 * It paints its own root background from the theme (surface.base).
 */
export const ThemePane = ({ title, theme, surfaceMode, colorMode, children }) => (
  <Column>
    <Text size="small" weight={500}>
      {title}
    </Text>
    <Grommet
      theme={theme || themes[surfaceMode]}
      themeMode={colorMode}
      options={{ box: { cssGap: true } }}
      style={{ borderRadius: 6, overflow: 'hidden' }}
    >
      <Surface
        token={TOKENS.base}
        label={`${title} · page`}
        pad="small"
        gap="small"
        border={{ color: 'border-weak' }}
        round="xsmall"
      >
        {children}
      </Surface>
    </Grommet>
  </Column>
);

ThemePane.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.object,
  surfaceMode: PropTypes.oneOf(['default', 'toned']),
  colorMode: PropTypes.oneOf(['light', 'dark']).isRequired,
  children: PropTypes.node,
};

/** The Part 2 tree, minus the modal: page > card > inner > nested; shell > card. */
export const Chain = ({ compact = false }) => (
  <Box gap="small">
    <Surface token={TOKENS.tone1} label="Card">
      <Surface token={TOKENS.tone2} label="Inner section">
        {!compact && <Surface token={TOKENS.tone1} label="Nested region" />}
      </Surface>
    </Surface>
    {!compact && (
      <Surface token={TOKENS.tone1} label="Shell panel">
        <Surface token={TOKENS.tone2} label="Card in shell" />
      </Surface>
    )}
  </Box>
);

Chain.propTypes = { compact: PropTypes.bool };

/** A floating surface over the page with the chain restarting inside it. */
export const Floating = ({ note }) => (
  <Surface
    token={TOKENS.floating}
    label="Floating (modal, drop, tooltip)"
    note={note}
    elevation="medium"
    round="small"
  >
    <Surface token={TOKENS.tone1} label="Card in floating">
      <Surface token={TOKENS.tone2} label="Nested in card" />
    </Surface>
  </Surface>
);

Floating.propTypes = { note: PropTypes.string };

/** What the active Grommet theme actually holds. */
export const ThemeFacts = () => {
  const theme = useContext(ThemeContext);
  const colors = theme.global.colors;
  const rows = [
    ['theme.dark', String(theme.dark)],
    ['global.colors.background', JSON.stringify(colors.background)],
    ...ROLE_ORDER.map(r => [`global.colors['background-${r}']`, colors[`background-${r}`]]),
    ...Object.keys(light.hpe.color.surface).map(s => [
      `global.colors['surface-${s}']`,
      JSON.stringify(colors[`surface-${s}`]),
    ]),
    ['card.container.background', theme.card.container.background],
    ['layer.background', theme.layer.background],
    ['global.drop.background', theme.global.drop.background],
    ['tip.content.background', theme.tip.content.background],
  ];
  return (
    <Code title="Read from the active theme object">
      {rows.map(([k, v]) => `${k.padEnd(44)} ${v}`).join('\n')}
    </Code>
  );
};
