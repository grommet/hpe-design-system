import React from 'react';
import { Button } from 'grommet';
import { Next } from 'grommet-icons';

export const ButtonPreview = () => {
  return (
      <Button
        label="Button"
        icon={<Next />}
        reverse
      />
  );
};
