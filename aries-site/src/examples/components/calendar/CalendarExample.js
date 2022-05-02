import { useState } from 'react';
import { Calendar } from 'grommet';

export function CalendarExample() {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <Calendar
      date={date}
      onSelect={onSelect}
      bounds={['2020-09-08', '2025-12-13']}
    />
  );
}
