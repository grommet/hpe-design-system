// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Box, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from 'grommet/utils';
import PropTypes from 'prop-types';
import { SurfaceStateContext, TOKENS, shortName } from './surfaceState';

/**
 * A labelled box carrying one surface token. Annotates itself with the token,
 * the value the theme resolves it to, and the value the browser actually
 * painted (getComputedStyle), so the two can be compared without judging by
 * eye. Exposes data attributes for the verification sweep.
 */
export const Surface = ({ token, label, children, note, ...rest }) => {
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
      {...rest}
    >
      <Box gap="xxsmall" flex={false}>
        <Text size="small" weight={500}>
          {label}
        </Text>
        <Text size="xsmall" color="text-weak">
          {shortName(token)} · theme {expected} · painted {computed}
        </Text>
        {note && (
          <Text size="xsmall" color="text-weak">
            {note}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};

Surface.propTypes = {
  token: PropTypes.string,
  label: PropTypes.string.isRequired,
  note: PropTypes.string,
  children: PropTypes.node,
};

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
