import React from 'react';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

export const ButtonPreview = () => {
  return <Button label="Button" icon={<FormNext />} reverse tabIndex={-1} />;
};
