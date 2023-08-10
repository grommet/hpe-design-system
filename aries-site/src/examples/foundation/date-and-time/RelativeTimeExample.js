import React from 'react';
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
};

export const RelativeTimeExample = ({ bestPractice = true }) => {
  // in production, this should just be new Date();
  const mockNow = new Date('2023-05-20T08:32:00.000Z');
  return (
    <DataTable
      columns={[
        {
          property: 'lastActivity',
          header: 'Last activity',
          render: datum => {
            return getRelativeTime(new Date(datum.lastActivity), mockNow);
          },
        },
      ]}
      sort={{ property: 'lastActivity', direction: 'desc' }}
      data={[
        {
          lastActivity: '2023-04-18T06:57:00.000Z',
        },
        {
          lastActivity: '2023-05-12T06:57:00.000Z',
        },
        {
          lastActivity: '2023-05-03T06:57:00.000Z',
        },
        {
          lastActivity: '2023-05-19T06:57:00.000Z',
        },
        {
          lastActivity: '2023-05-20T06:57:00.000Z',
        },
        {
          lastActivity: '2023-05-20T08:29:00.000Z',
        },
      ]}
    />
  );
};
