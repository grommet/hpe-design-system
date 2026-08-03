import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import styled from 'styled-components';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const getSelectOptionPad = theme =>
  theme?.button?.size?.medium?.option?.pad || HPE_OPTION_PAD;

const resolveMarkerColor = (theme, token, fallback) => {
  const raw = theme?.global?.colors?.[token];
  if (!raw) return fallback;
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object')
    return (theme?.dark ? raw.dark : raw.light) || raw.dark || raw.light || fallback;
  return fallback;
};

const getMarkerTokens = theme => {
  const marker = theme?.select?.default?.medium?.option?.marker;
  return {
    width: marker?.width || '6px',
    borderTopLeftRadius: marker?.borderTopLeftRadius || '9999px',
    borderBottomLeftRadius: marker?.borderBottomLeftRadius || '9999px',
    top: marker?.top || '-1px',
    bottom: marker?.bottom || '-1px',
    left: marker?.left || '-1px',
  };
};

const StyledMarkerBox = styled(Box)`
  position: relative;

  &::before {
    display: ${({ $selected }) => ($selected ? 'block' : 'none')};
    position: absolute;
    content: '';
    width: ${({ $markerWidth }) => $markerWidth};
    border-top-left-radius: ${({ $markerBorderTopLeftRadius }) => $markerBorderTopLeftRadius};
    border-bottom-left-radius: ${({ $markerBorderBottomLeftRadius }) => $markerBorderBottomLeftRadius};
    top: ${({ $markerTop }) => $markerTop};
    bottom: ${({ $markerBottom }) => $markerBottom};
    left: ${({ $markerLeft }) => $markerLeft};
    background: ${({ $markerColor }) => $markerColor};
    pointer-events: none;
  }
`;

const StyledOptionLabel = styled.span`
  font-weight: 500;
`;

const SelectOptionRow = ({ label, selected, active, pad }) => {
  const theme = useContext(ThemeContext);
  const resolvedPad = pad || getSelectOptionPad(theme);
  const markerColor = resolveMarkerColor(theme, 'border-selected', '#006750');
  const markerTokens = getMarkerTokens(theme);

  const background =
    selected && active
      ? 'background-selected-primary-hover'
      : selected
      ? 'background-selected-primary'
      : active
      ? 'background-selected-primary-weak'
      : undefined;

  return (
    <StyledMarkerBox
      direction="row"
      align="center"
      pad={resolvedPad}
      round="xsmall"
      background={background}
      $selected={selected}
      $markerColor={markerColor}
      $markerWidth={markerTokens?.width}
      $markerBorderTopLeftRadius={markerTokens?.borderTopLeftRadius}
      $markerBorderBottomLeftRadius={markerTokens?.borderBottomLeftRadius}
      $markerTop={markerTokens?.top}
      $markerBottom={markerTokens?.bottom}
      $markerLeft={markerTokens?.left}
    >
      <StyledOptionLabel>{label}</StyledOptionLabel>
    </StyledMarkerBox>
  );
};

SelectOptionRow.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selected: PropTypes.bool,
};

export { getSelectOptionPad, SelectOptionRow };
