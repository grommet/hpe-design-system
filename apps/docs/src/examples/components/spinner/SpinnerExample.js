import React from 'react';
import { Spinner } from 'grommet';

export const SpinnerExample = () => (
  <Spinner
    message={{
      start: 'Loading data.',
      end: 'Data has been loaded.',
    }}
  />
);
