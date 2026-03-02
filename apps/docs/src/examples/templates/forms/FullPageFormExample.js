import React from 'react';
import { Image } from 'grommet';
import { useDarkMode } from '../../../utils';

export const FullPageFormExample = () => {
  const themeMode = useDarkMode().value ? 'dark' : 'light';
  return (
    <Image
      src={
        themeMode === 'dark'
          ? '/templateImages/coming-soon-invert.svg'
          : '/templateImages/coming-soon.svg'
      }
      alt="Coming Soon text next to a clock icon."
      fit="contain"
    />
  );
};
