import React, { useRef, useEffect } from 'react';
import { Box, DateInput } from 'grommet';

export const DateInputPreview = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const buttons = ref.current.querySelectorAll('button, input');
      buttons.forEach(button => {
        button.setAttribute('tabindex', '-1');
      });
    }
  }, []);

  return (
    <Box ref={ref}>
      <DateInput aria-label="preview" format="mm/dd/yyyy" />
    </Box>
  );
};
