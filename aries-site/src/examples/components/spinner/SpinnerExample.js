import React from 'react';
import { Spinner } from 'grommet';

export function SpinnerExample() {
  return <Spinner
    message={{
      start: 'Loading data.',
      end: 'Data has been loaded.',
    }}
  />;
}
