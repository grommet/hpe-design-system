import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { Box, ThemeContext } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const baseSpacing = 12;
const scaledDownTheme = deepMerge(generate(baseSpacing), hpe);

export const ScreenContainer = ({ mobile, ...rest }) => (
  <ThemeContext.Extend value={scaledDownTheme}>
    <Box
      background="background-back"
      style={{ position: 'relative' }}
      fill={!mobile}
      {...rest}
    />
  </ThemeContext.Extend>
);

ScreenContainer.propTypes = {
  mobile: PropTypes.bool,
};
