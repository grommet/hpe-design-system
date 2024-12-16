import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grommet, Stack, ThemeContext } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { current as hpeCurrent } from '../../../themes/theme';
import { ModeContext } from './ModeContext';

export const Compare = ({ children, ...rest }) => {
  const { mode, direction } = React.useContext(ModeContext);
  const theme = useContext(ThemeContext);

  if (direction === 'row') {
    return (
      <Box direction="row" gap="medium">
        <Grommet
          theme={hpe}
          themeMode={theme.dark ? 'dark' : 'light'}
          background="background-front"
        >
          <Box align="start">{children}</Box>
        </Grommet>
        <Grommet
          theme={hpeCurrent}
          themeMode={theme.dark ? 'dark' : 'light'}
          background="background-front"
        >
          <Box align="start">{children}</Box>
        </Grommet>
      </Box>
    );
  }

  return (
    <Stack {...rest}>
      <ThemeContext.Extend value={hpe}>
        <Box
          align="start"
          style={
            // eslint-disable-next-line no-nested-ternary
            mode === 'Compare diffs'
              ? { opacity: 0.5, filter: 'invert(1)', color: 'green' }
              : mode === 'next'
              ? { visibility: 'hidden' }
              : {}
          }
        >
          {children}
        </Box>
      </ThemeContext.Extend>

      <ThemeContext.Extend value={hpeCurrent}>
        <Box
          align="start"
          style={mode === 'v5' ? { visibility: 'hidden' } : {}}
        >
          {children}
        </Box>
      </ThemeContext.Extend>
    </Stack>
  );
};

Compare.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
};
