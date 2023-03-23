import React from 'react';
import { Box, Grommet } from 'grommet';
import PropTypes from 'prop-types';
import { ariesPop } from '../../themes/aries';
import { analytics, useDarkMode } from '../../utils';

export const ThemeMode = ({ children, ...rest }) => {
  const { value } = useDarkMode(ariesPop.defaultMode === 'dark');
  const themeMode = value ? 'dark' : 'light';

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <Grommet
      background="background-back"
      options={{
        layer: {
          singleId: true,
        },
      }}
      theme={ariesPop}
      themeMode={themeMode}
      full="min"
      onAnalytics={analytics}
      {...rest}
    >
      {children}
    </Grommet>
  );

  // prevents ssr flash for mismatched dark mode
  // and responsive layout differences
  if (!mounted) {
    return <Box style={{ visibility: 'hidden' }}>{body}</Box>;
  }

  return body;
};

ThemeMode.propTypes = {
  children: PropTypes.element,
};
