import React from 'react';
import { Box, Grommet } from 'grommet';
import { aries } from '../../themes/aries';
import { useDarkMode } from '../../utils';

export const ThemeMode = ({ children }) => {
  const { value } = useDarkMode(aries.defaultMode === 'dark');
  const themeMode = value ? 'dark' : 'light';

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <Grommet theme={aries} themeMode={themeMode} full>
      <Box background="background-back">{children}</Box>
    </Grommet>
  );

  // prevents ssr flash for mismatched dark mode
  // and responsive layout differences
  if (!mounted) {
    return <Box style={{ visibility: 'hidden' }}>{body}</Box>;
  }

  return body;
};
