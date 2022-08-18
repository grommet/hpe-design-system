import React from 'react';
import { useDarkMode } from '../../../utils';
import { Image } from 'grommet';

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
