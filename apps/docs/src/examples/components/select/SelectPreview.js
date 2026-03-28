import React, { useRef, useEffect } from 'react';
import { Select } from 'grommet';

export const SelectPreview = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const input = ref.current.querySelector('input, button');
      if (input) {
        input.setAttribute('tabindex', '-1');
      }
    }
  }, []);

  return (
    <div ref={ref}>
      <Select aria-label="preview" options={['First']} placeholder="Choices" />
    </div>
  );
};
