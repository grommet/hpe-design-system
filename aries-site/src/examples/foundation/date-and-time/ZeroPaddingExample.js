import React from 'react';
import { DataTable } from 'grommet';

const dates = [
  Date.UTC(2023, 6, 5, 3, 0, 0),
  Date.UTC(2023, 10, 12, 5, 30, 0),
  Date.UTC(2023, 8, 4, 10, 12, 0),
  Date.UTC(2023, 1, 5, 3, 15, 0),
];

export const ZeroPaddingExample = ({ bestPractice = true }) => {
  const options = {
    year: 'numeric',
    month: bestPractice ? '2-digit' : 'numeric',
    day: bestPractice ? '2-digit' : 'numeric',
    hour: bestPractice ? '2-digit' : 'numeric',
    minute: bestPractice ? '2-digit' : 'numeric',
  };

  return (
    <DataTable
      columns={[
        {
          property: 'createdOn',
          header: 'Created on',
          render: datum =>
            new Date(datum.createdOn).toLocaleDateString(undefined, options),
        },
      ]}
      data={dates.map(date => {
        return {
          createdOn: date,
        };
      })}
    />
  );
};
