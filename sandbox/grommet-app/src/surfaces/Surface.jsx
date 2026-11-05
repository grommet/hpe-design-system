// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Box, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from 'grommet/utils';
import PropTypes from 'prop-types';
import { SurfaceStateContext, TOKENS, shortName } from './surfaceState';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/**
 * A labelled box carrying one surface token. Annotates itself with the token,
 * the value the theme resolves it to, and the value the browser actually
 * painted (getComputedStyle), so the two can be compared without judging by
 * eye. Exposes data attributes for the verification sweep.
 *
 * `region` marks a chief architectural area (page, nav, header, content
 * sheet, contextual panel, chrome): the label renders as a larger heading so
 * the page structure reads at a glance. `scaffold` marks something that is
 * not rendered UI in the real product (the Grommet root behind a chrome)
 * and draws it as a dashed, labelled strip instead of a surface.
 */
export const Surface = ({
  token,
  label,
  children,
  note,
  region = false,
  scaffold = false,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const state = useContext(SurfaceStateContext);
  const ref = useRef();
  const [computed, setComputed] = useState('');

  useLayoutEffect(() => {
    if (ref.current) {
      setComputed(getComputedStyle(ref.current).backgroundColor);
    }
  }, [state.surfaceMode, state.colorMode, token]);

  const expected = token ? normalizeColor(token, theme) : 'transparent';

  return (
    <Box
      ref={ref}
      background={token || undefined}
      data-surface-token={token || 'none'}
      data-surface-label={label}
      pad="small"
      gap="small"
      round="xsmall"
      {...(scaffold && {
        border: { color: 'border-strong', style: 'dashed' },
        pad: { horizontal: 'small', vertical: 'xsmall' },
      })}
      {...rest}
    >
      <Box gap="xxsmall" flex={false}>
        <Text
          size={region ? 'large' : 'small'}
          weight={region ? 600 : 500}
          color={scaffold ? 'text-weak' : undefined}
        >
          {label}
          {scaffold && (
            <Text size="xsmall" color="text-weak" margin={{ left: 'small' }}>
              not rendered UI
            </Text>
          )}
        </Text>
        <Box direction="row" gap="xsmall" align="center" wrap>
          <Box
            round="xsmall"
            border={{ color: 'border-weak' }}
            pad={{ horizontal: 'xsmall', vertical: '5xsmall' }}
            flex={false}
          >
            <Text size="xsmall" style={{ fontFamily: MONO }}>
              {shortName(token)}
              {state.detail && ` · theme ${expected} · painted ${computed}`}
            </Text>
          </Box>
          {note && (
            <Text size="xsmall" color="text-weak">
              {note}
            </Text>
          )}
        </Box>
      </Box>
      {children}
    </Box>
  );
};

Surface.propTypes = {
  token: PropTypes.string,
  label: PropTypes.string.isRequired,
  note: PropTypes.string,
  region: PropTypes.bool,
  scaffold: PropTypes.bool,
  children: PropTypes.node,
};

/* ------------------------------------------------------------------------
 * Content stand-ins. The pages must read as a UI without carrying any real
 * content, so cards and panels are filled with skeleton lines and the chrome
 * with the furniture a real shell has (brand, search, actions, rail icons,
 * nav items). None of these are surfaces: the bars use a translucent text
 * colour, the rail uses background-contrast (a standard fill, decision 15a).
 * ---------------------------------------------------------------------- */

/** A few skeleton lines standing in for text. */
export const Lines = ({ count = 3, width = '100%' }) => (
  <Box gap="xsmall" flex={false} aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <Box
        key={i}
        height="10px"
        width={i === count - 1 ? '60%' : width}
        round="xsmall"
        background={{ color: 'text-weak', opacity: 'weak' }}
      />
    ))}
  </Box>
);

Lines.propTypes = { count: PropTypes.number, width: PropTypes.string };

/** A metric-shaped stand-in: big number, label, a line. */
export const MetricLines = () => (
  <Box gap="xsmall" flex={false} aria-hidden="true">
    <Box
      height="28px"
      width="40%"
      round="xsmall"
      background={{ color: 'text-weak', opacity: 'medium' }}
    />
    <Lines count={2} />
  </Box>
);

/**
 * Decision 14 failure mode: a reusable component that hard-codes a tone.
 * Placed on the page it is right; placed in a tone-1 panel it self-nests.
 */
export const HardCodedWidget = ({ where }) => (
  <Surface
    token={TOKENS.tone1}
    label={`Hard-coded tone.1 widget (${where})`}
    note="decision 14: fixed tone, not passed in"
    border={{ color: 'border-weak' }}
  />
);

HardCodedWidget.propTypes = { where: PropTypes.string.isRequired };

/**
 * The stranded case: a component that hard-codes the legacy grey as a
 * literal value rather than a token. Right by accident in default light,
 * wrong everywhere else, and untouched by a value swap.
 */
export const HardCodedHexWidget = ({ where }) => (
  <Surface
    token="#f7f7f7"
    label={`Hard-coded #f7f7f7 widget (${where})`}
    note="decision 14: literal value, stranded by inversion and by dark"
    border={{ color: 'border-weak' }}
  />
);

HardCodedHexWidget.propTypes = { where: PropTypes.string.isRequired };
