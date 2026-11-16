// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { SURFACE_ROLES, useSurface, useSurfaceVariant } from '../../surfaces';

// Box (or another Grommet container via `component`) painted with the
// active variant's token for `role`. With no role it takes no surface and
// shows whatever is behind it.
export const Surface = ({ role, component: Component = Box, ...rest }) => (
  <Component background={useSurface(role)} {...rest} />
);

Surface.propTypes = {
  role: PropTypes.oneOf(SURFACE_ROLES),
  component: PropTypes.elementType,
};

// Annotation chip naming the token painted on the area the tag sits in.
// Pass `role` to read token and note from the active variant, or `token`
// (and `note`) for areas with no surface of their own. Renders nothing
// unless annotations are switched on in the preview bar. Transparent with
// a border so the chip is not itself a surface. `compact` keeps the note
// off the page, as the chip's tooltip, where there is no room for it.
export const SurfaceTag = ({
  role,
  token,
  note,
  showVariant,
  compact,
  ...rest
}) => {
  const variant = useSurfaceVariant();
  if (!variant.annotate) return null;
  const label = token || variant.tokens[role];
  const text = note || (role && variant.notes[role]);
  return (
    <Box gap="3xsmall" flex={false} alignSelf="start" {...rest}>
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
          title={compact ? text : undefined}
        >
          <Text
            size="xsmall"
            weight={500}
            color="text-strong"
            style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}
          >
            {label}
          </Text>
        </Box>
        {text && !compact && (
          <Text size="xsmall" color="text-weak">
            {text}
          </Text>
        )}
      </Box>
    </Box>
  );
};

SurfaceTag.propTypes = {
  role: PropTypes.oneOf(SURFACE_ROLES),
  token: PropTypes.string,
  note: PropTypes.string,
  showVariant: PropTypes.bool,
  compact: PropTypes.bool,
};
