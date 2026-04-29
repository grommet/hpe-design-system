import React from 'react';
import { Button } from 'grommet';
import { Right } from '@hpe-design/icons-grommet';
import { useInert } from '@shared/hooks';

export const ButtonPreview = () => {
  const ref = useInert();

  return (
    <Button ref={ref} label="Button" icon={<Right />} reverse />
  );
};
