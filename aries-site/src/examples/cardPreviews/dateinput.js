import React from 'react';
import { DateInput } from 'grommet';

export const DateInputPreview = () => {
  return <DateInput format="mm/dd/yyyy" value={new Date().toISOString()} />;
};
