import React from 'react';
import { DataTable } from 'grommet';

// could be expanded to weeks, months, etc.
const getDuration = (start, end) => {
  const difference = end.getTime() - start.getTime();
  const hours = difference / (1000 * 60 * 60);
  const minutes = (hours % 1) * 60;
  const seconds = (minutes % 1) * 60;

  const formattedTime = {
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(seconds),
  };

  return `${formattedTime.hours ? `${formattedTime.hours} hr` : ''} ${
    formattedTime.minutes ? `${formattedTime.minutes} min` : ''
  } ${formattedTime.seconds ? `${formattedTime.seconds} sec` : ''}`;
};

export const DateAlignmentExample = () => {
  // in production, this should just be new Date();
  const mockNow = new Date('2023-05-20T08:32:18.000Z');
  return (
    // eslint-disable-next-line grommet/datatable-aria-describedby
    <DataTable
      columns={[
        {
          property: 'triggerTime',
          header: 'Trigger time',
        },
        {
          property: 'id',
          header: 'Duration',
          align: 'end',
          render: datum => getDuration(new Date(datum.triggerTime), mockNow),
        },
      ]}
      sort={{ property: 'triggerTime', direction: 'desc' }}
      data={[
        {
          id: 0,
          triggerTime: '2023-05-20T07:32:08.000Z',
        },
        {
          id: 1,
          triggerTime: '2023-05-20T07:45:15.000Z',
        },
        {
          id: 2,
          triggerTime: '2023-05-20T04:30:24.000Z',
        },
        {
          id: 3,
          triggerTime: '2023-05-20T07:49:30.000Z',
        },
        {
          id: 4,
          triggerTime: '2023-05-20T07:53:46.000Z',
        },
      ]}
    />
  );
};
