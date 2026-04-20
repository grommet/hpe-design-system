import React from 'react';
import { TextArea } from 'grommet';
import { useInert } from '@shared/hooks';

export const TextAreaPreview = () => {
  const ref = useInert();

  return (
    <TextArea ref={ref} aria-label="preview" placeholder="Placeholder" />
  );
};
