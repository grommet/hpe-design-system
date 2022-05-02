import React from 'react';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

export function ButtonPreview() {
  return <Button label="Button" icon={<FormNext />} reverse tabIndex={-1} />;
}
