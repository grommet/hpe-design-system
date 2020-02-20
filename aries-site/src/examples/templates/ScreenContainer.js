import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ThemeMode } from '../../components';
import { SidebarExample } from '.';

const baseSpacing = 12;
const scaledDownTheme = deepMerge(generate(baseSpacing), hpe);

export const ScreenContainer = ({ mobile, ...rest }) => {
  // const size = useContext(ResponsiveContext);
  const size = mobile && 'small';
  return (
    <ThemeMode
      background="background-front" // match Example background
      breakpoint={size}
      theme={scaledDownTheme}
    >
      <Box
        background="background-back"
        style={{ position: 'relative' }}
        width={size === 'small' ? { max: 'large' } : undefined}
        height={size === 'small' ? { max: 'xlarge' } : undefined}
      >
        <Box direction="row" overflow="auto">
          {size !== 'small' && <SidebarExample mobile={mobile} />}
          <Box
            pad={{ horizontal: 'medium', bottom: 'medium' }}
            flex
            {...rest}
          />
        </Box>
        {size === 'small' && (
          <SidebarExample
            direction="row"
            fill="horizontal"
            mobile={mobile}
            style={{ position: 'absolute', bottom: 0, left: 0 }}
          />
        )}
      </Box>
    </ThemeMode>
  );
};

ScreenContainer.propTypes = {
  mobile: PropTypes.bool,
};
