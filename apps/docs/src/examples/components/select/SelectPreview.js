import React from 'react';
import { Select } from 'grommet';
import { useInert } from '@shared/hooks';

export const SelectPreview = () => {
  const ref = useInert();

  return (
    <div ref={ref}>
      <Select aria-label="preview" options={['First']} placeholder="Choices" />
    </div>
  );
};
