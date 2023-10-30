import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'grommet';

// this gives a rough estimate
const getRelativeTime = (date1, date2, locale = 'en') => {
  const diff = Math.floor(date1.getTime() - date2.getTime());
  const hour = 1000 * 60;
  let minutes = diff / hour;
  if (minutes < 0) minutes = Math.round(minutes);
  let hours = minutes / 60;
  if (hours < 0) hours = Math.round(hours);
  else hours = Math.floor(hours);
  let days = hours / 24;
  if (days < 0) days = Math.round(days);
  else days = Math.floor(days);
  let months = days / 31;
  if (months < 0) months = Math.round(months);
  else months = Math.floor(months);
  let years = months / 12;
  if (years < 0) years = Math.round(years);
  else years = Math.floor(years);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  if (years)
    return date1.toLocaleDateString(undefined, {
      month: 'long',
      day: 'short',
      year: 'numeric',
      weekday: 'short',
    });
  if (months)
    return date1.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      weekday: 'short',
    });
  if (days) return rtf.format(days, 'day');
  if (hours) return rtf.format(hours, 'hour');
  if (minutes) return rtf.format(minutes, 'minute');
  return undefined;
};

const badPracticesTimes = [
  '1 mo 2 wk 4 days 10 hr 5 min 8 sec ago',
  '8 days 5 hr 12 min 6 sec ago',
  '1 wk 6 days 3 hr 18 min 2 sec ago',
  '1 day 2 hr 5 min 30 sec ago',
  '2 hr 3 min 12 sec ago',
  '3 min 25 sec ago',
  '7 min 15 sec ago',
];

export const RelativeTimeExample = ({ bestPractice = true }) => {
  // in production, this should just be new Date();
  const mockNow = new Date('2023-05-20T08:32:00.000Z');
  return (
    // eslint-disable-next-line grommet/datatable-aria-describedby
    <DataTable
      columns={[
        {
          property: 'lastActivity',
          header: 'Last activity',
          render: datum => {
            return bestPractice
              ? getRelativeTime(new Date(datum.lastActivity), mockNow)
              : badPracticesTimes[datum.id];
          },
          align: 'end',
        },
      ]}
      sort={{ property: 'lastActivity', direction: 'desc' }}
      data={[
        {
          id: 0,
          lastActivity: '2023-04-18T06:57:00.000Z',
        },
        {
          id: 1,
          lastActivity: '2023-05-12T06:57:00.000Z',
        },
        {
          id: 2,
          lastActivity: '2023-05-03T06:57:00.000Z',
        },
        {
          id: 3,
          lastActivity: '2023-05-19T06:57:00.000Z',
        },
        {
          id: 4,
          lastActivity: '2023-05-20T06:57:00.000Z',
        },
        {
          id: 5,
          lastActivity: '2023-05-20T08:29:00.000Z',
        },
        {
          id: 6,
          lastActivity: '2023-05-20T08:25:00.000Z',
        },
      ]}
    />
  );
};

RelativeTimeExample.propTypes = {
  bestPractice: PropTypes.bool,
};
