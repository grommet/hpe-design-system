import React from 'react';
import { Grommet } from 'grommet';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ariesPop } from '../../themes/aries';
import { analytics, useDarkMode } from '../../utils';

export const ThemeMode = ({ children, ...rest }) => {
  const router = useRouter();
  const { value } = useDarkMode(ariesPop.defaultMode === 'dark');
  const themeMode = value ? 'dark' : 'light';

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <Grommet
      background={
        // one level nested = hub page
        router.pathname.split('/').filter(part => part).length === 1
          ? 'background-back'
          : 'background-back'
      }
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

  // prevents ssr flash for mismatched dark mode and ensures no hydration errors

  return mounted && body;
};

ThemeMode.propTypes = {
  children: PropTypes.element,
};
