import React from 'react';
import { Button } from 'grommet';
import { Right } from '@hpe-design/icons-grommet';

export const ButtonPreview = () => (
  <Button label="Button" icon={<Right />} reverse tabIndex={-1} />
);
