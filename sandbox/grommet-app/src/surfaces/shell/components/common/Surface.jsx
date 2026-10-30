// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from 'grommet/utils';
import { SurfaceStateContext, shortName } from '../../../surfaceState';
import { SHELL_READINGS, useSurface, useSurfaceVariant } from '../../surfaces';

const roles = Object.keys(SHELL_READINGS.framed.tokens);

/**
 * Box (or another Grommet container via `component`) painted with the
 * active reading's token for `role`. Carries the same data attributes as the
 * validation pages' Surface so the sweep (window.__runSurfaceMatrix) reads
 * the painted value of every shell area.
 */
export const Surface = ({
  role,
  component: Component = Box,
  label,
  ...rest
}) => {
  const token = useSurface(role);
  return (
    <Component
      background={token}
      data-surface-token={token}
      data-surface-label={label || `shell · ${role}`}
      {...rest}
    />
  );
};

Surface.propTypes = {
  role: PropTypes.oneOf(roles).isRequired,
  component: PropTypes.elementType,
  label: PropTypes.string,
};

// Read what the browser painted on the nearest ancestor carrying the
// surface, so the chip can show theme value and painted value side by side
// as the validation pages do.
const usePainted = (enabled, token) => {
  const ref = useRef();
  const state = useContext(SurfaceStateContext);
  const [painted, setPainted] = useState('');
  useLayoutEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current.closest(`[data-surface-token="${token}"]`);
    setPainted(el ? getComputedStyle(el).backgroundColor : '');
  }, [enabled, token, state.surfaceMode, state.colorMode]);
  return [ref, painted];
};

/**
 * Annotation chip naming the token painted on the area the tag sits in.
 * Pass `role` to read token and note from the active reading, or `token`
 * (and `note`) for areas with no surface of their own. Renders nothing
 * unless annotation is on. Transparent with a border so the chip is not
 * itself a surface.
 */
export const SurfaceTag = ({ role, token, note, showVariant, ...rest }) => {
  const variant = useSurfaceVariant();
  const theme = useContext(ThemeContext);
  const assigned = token || variant.tokens[role];
  const [ref, painted] = usePainted(variant.annotate, assigned);
  if (!variant.annotate) return null;
  // normalizeColor returns the input unchanged when it is not a colour name
  const resolved = assigned ? normalizeColor(assigned, theme) : '';
  const showResolved = resolved && resolved !== assigned;
  const text = note || (role && variant.notes[role]);
  return (
    <Box gap="3xsmall" flex={false} alignSelf="start" ref={ref} {...rest}>
      {showVariant && (
        <Text size="xsmall" weight={500} color="text-strong">
          {variant.label}
        </Text>
      )}
      <Box direction="row" align="center" gap="xsmall" wrap>
        <Box
          round="xsmall"
          border={{ color: 'border-strong' }}
          pad={{ horizontal: 'xsmall', vertical: '5xsmall' }}
          flex={false}
        >
          <Text
            size="xsmall"
            weight={500}
            color="text-strong"
            style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}
          >
            {shortName(assigned)}
            {showResolved && ` · ${resolved}`}
            {painted && ` · painted ${painted}`}
          </Text>
        </Box>
        {text && (
          <Text size="xsmall" color="text-weak">
            {text}
          </Text>
        )}
      </Box>
    </Box>
  );
};

SurfaceTag.propTypes = {
  role: PropTypes.oneOf(roles),
  token: PropTypes.string,
  note: PropTypes.string,
  showVariant: PropTypes.bool,
};
